/**
 * @fileoverview Redis Queue Consumer for the DCS-Hivemind Gateway.
 * * This module implements a multi-lane priority queue consumer that bridges 
 * AI agents and DCS World. It monitors multiple Redis lists (lanes) and 
 * ensures that high-priority tactical commands are processed before 
 * lower-priority telemetry or background tasks.
 */

import { createClient } from "redis";
import { logInfo, logError, logWarning } from "../util/logging.js";
import type { DcsLuaMessage, LaneOrder } from "../util/types.js";
import { DcsGatewayLuaPrefix, LANE_HIGH, LANE_LOW, LANE_MEDIUM } from "../util/constants.js";

const redisClient = createClient({ url: process.env.TACBUS_URI });

await redisClient.connect();

const laneOrder: LaneOrder[] = [LANE_HIGH, LANE_MEDIUM, LANE_LOW];

/**
 * Orchestrates the continuous consumption of messages from multiple Redis lanes.
 * * This function implements a blocking polling strategy (using BRPOP) to 
 * efficiently wait for new commands without hammering the CPU. It respects 
 * the order of the `laneOrder` array, providing a strict priority-based 
 * execution flow.
 * * @param {Object} cancelToken - A controller object used to gracefully shut down the consumer.
 * @param {boolean} cancelToken.cancelled - When set to true, the loop will terminate after the current iteration.
 * * @example
 * const token = { cancelled: false };
 * startMultiLane(token);
 * * // Later, to stop:
 * token.cancelled = true;
 * * @returns {Promise<void>} Resolves only when the cancellation token is triggered or a fatal error occurs.
 * @throws {Error} Logs and attempts to recover from Redis connection interruptions or JSON parsing failures.
 */
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