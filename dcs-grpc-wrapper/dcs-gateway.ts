import { createClient } from "redis";
import { logInfo, logError, logWarning } from "@dcs-hivemind/util/logging.js";
import type { DcsLuaMessage, LaneOrder } from "@dcs-hivemind/util/types.js";
import { DcsGatewayLuaPrefix } from "@dcs-hivemind/util/constants.js";

const queueClient = createClient({ url: process.env.ConnectionStrings__queue });
const messageClient = createClient({ url: process.env.ConnectionStrings__messaging });

queueClient.on("error", (err) => console.error("Queue Client Error", err));
messageClient.on("error", (err) => console.error("Message Client Error", err));

await queueClient.connect();
await messageClient.connect();

const laneOrder: LaneOrder[] = ["high", "medium", "low"];

const readLane = async (lane: string) => {
    try {

        const message = await queueClient.rPop(`${DcsGatewayLuaPrefix}:${lane}`);

        if (!message) {
            logInfo(`No message found in lane ${lane}`);
            return;
        }

        logInfo(`Read from lane ${lane}`);

        const { lua, sender } = JSON.parse(message) as DcsLuaMessage;

        if (!lua) {
            logWarning(`No message found in lane ${lane}, sender:${sender}`);
            return;
        }

        const result = "test";

        return { result, sender };
    } catch (err) {
        logError(`Error reading from lane ${lane}:`, err);
    }

};

const startMultiLane = async (cancelToken: { cancelled: boolean }) => {

    while (!cancelToken.cancelled) {
        try {

            for (const lane of laneOrder) {

                const response = await readLane(lane);

                if (!response) {
                    continue;
                }

                const { result, sender } = response;

                await messageClient.publish(sender, result);
            }

        } catch (err) {
            logError("Error in consumeByMultilane:", err);
        }
    }
}

await startMultiLane({ cancelled: false });