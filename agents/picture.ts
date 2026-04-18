import { createClient } from "redis";
import { Subject, from, timer, of } from "rxjs";
import { switchMap, tap, timeout, catchError, repeat, delay, take } from "rxjs/operators";
import { logError, logInfo, logWarning } from "../util/logging.js";
import { DcsGatewayLuaPrefix } from "../util/constants.js";

const redisClient = createClient({ url: process.env.TACBUS_URI });

const subscriber = redisClient.duplicate();

await Promise.all([redisClient.connect(), subscriber.connect()]);

const pollingRate = process.env.POLLINGRATE ? parseInt(process.env.POLLINGRATE) : 5000;
const timeoutDuration = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 60000;

const sender = process.env.SENDER_NAME!;

const responseStream$ = new Subject<string>();

subscriber.subscribe(sender, (message: string) => {
    responseStream$.next(message);
});


const sendGetPictureRequest = () => {
    const dcsLuaMessage = { sender, lua: "get_picture()", messageType: "DcsLuaMessage" };
    return from(redisClient.lPush(`${DcsGatewayLuaPrefix}:low`, JSON.stringify(dcsLuaMessage)));
};


const orchestrator$ = of(null).pipe(
    tap(() => logInfo("Requesting picture...")),
    switchMap(() => sendGetPictureRequest()),
    switchMap(() => responseStream$.pipe(
        take(1),
        timeout({
            each: timeoutDuration,
            with: () => {
                logWarning(`${timeoutDuration / 1000}s Grace period expired. Retrying...`);
                return of(null);
            }
        })
    )),
    delay(pollingRate),
    catchError(err => {
        logError("Stream error:", err);
        return timer(5000);
    }),
    repeat()
);


orchestrator$.subscribe();