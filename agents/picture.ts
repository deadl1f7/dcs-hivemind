/**
 * @fileoverview Tactical Picture Agent for DCS-Hivemind.
 * * This agent orchestrates the periodic retrieval of tactical situational data
 * from DCS World. It utilizes a reactive RxJS stream to manage the 
 * "Request-Response-Timeout" lifecycle over the Redis TacBus.
 */

import { createClient } from "redis";
import { Subject, from, timer, of } from "rxjs";
import { switchMap, tap, timeout, catchError, repeat, delay, take } from "rxjs/operators";
import { logError, logInfo, logWarning } from "../util/logging.js";
import { DcsGatewayLuaPrefix, LANE_LOW } from "../util/constants.js";

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
    return from(redisClient.lPush(`${DcsGatewayLuaPrefix}:${LANE_LOW}`, JSON.stringify(dcsLuaMessage)));
};

/**
 * Main reactive orchestrator for the Picture Agent.
 * * Workflow:
 * 1. Log and send a Lua request via Redis LPUSH.
 * 2. Switch to the response stream and wait for exactly one message (`take(1)`).
 * 3. Enforce a grace period; if it expires, log a warning and fallback to a null emission.
 * 4. Apply a cool-down delay (polling rate).
 * 5. Catch any stream errors, wait 5s, and repeat the entire cycle.
 * * @type {Observable<any>}
 */
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