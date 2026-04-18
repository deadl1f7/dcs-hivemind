import { createClient } from "redis";
import { logInfo, logError, logWarning } from "../util/logging.js";
import type { DcsLuaMessage, LaneOrder } from "../util/types.js";
import { DcsGatewayLuaPrefix } from "../util/constants.js";

const redisClient = createClient({ url: process.env.TACBUS_URI });

await redisClient.connect();

const laneOrder: LaneOrder[] = ["high", "medium", "low"];

const startMultiLane = async (cancelToken: { cancelled: boolean }) => {

    const keys = laneOrder.map(lane => `${DcsGatewayLuaPrefix}:${lane}`);

    while (!cancelToken.cancelled) {
        try {
            const result = await redisClient.brPop(keys, 0);

            if (result) {
                const { key, element } = result;
                const lane = key.split(':').pop();

                logInfo(`Processing ${lane} priority command`);

                const { lua, sender } = JSON.parse(element) as DcsLuaMessage;

                logInfo(`Executing LUA from lane ${lane}, sender:${sender}:`, { lua });

                await redisClient.publish(sender, "test");
            }
        } catch (err) {
            logError("Queue connection interrupted:", err);
            await new Promise(r => setTimeout(r, 1000));
        }
    }
}

await startMultiLane({ cancelled: false });