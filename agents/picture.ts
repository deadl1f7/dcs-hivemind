import { createClient } from "redis"
import { DcsLuaMessage, LaneOrder } from "../util/types.js";
import { logInfo, logError } from "../util/logging.js";
import { DcsGatewayLuaPrefix } from "../util/constants.js";

console.log("Starting Picture Agent...");

const pollingRate = process.env.POLLING_RATE ? parseInt(process.env.POLLING_RATE) : 1000;
const messageClient = createClient({ url: process.env.ConnectionStrings__tacbus });
const queueClient = createClient({ url: process.env.ConnectionStrings__tacbus });

const sender = process.env.SENDER_NAME;

if (!sender) {
    logError("SENDER_NAME environment variable is not set. Exiting.");
    process.exit(1);
}

await messageClient.subscribe(sender, (message: string) => {
    logInfo(`Received message on ${sender}:`, { message });
});

const getPicture = async (options: { priority?: LaneOrder } = {}) => {

    const dcsLuaMessage: DcsLuaMessage = {
        sender,
        lua: "get_picture()",
        messageType: "DcsLuaMessage"
    };

    const priority: LaneOrder = options.priority || "low";

    await queueClient.lPush(`${DcsGatewayLuaPrefix}:${priority}`, JSON.stringify(dcsLuaMessage));
}

setInterval(async () => {
    console.log("Polling");
    try {
        await getPicture();
    } catch (err) {
        logError("Error getting picture:", { error: err instanceof Error ? { message: err.message, stack: err.stack } : err });
    }
}, pollingRate);

