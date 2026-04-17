import os from 'node:os';
import path from 'node:path';
import { createBuilder } from './.modules/aspire.js';

const builder = await createBuilder();

const protoPath = path.join(
    os.homedir(),
    "Saved Games", "DCS", "Docs", "DCS-gRPC", "protos", "dcs", "dcs.proto"
);

const redis = await builder.addRedis("tacbus");

// Add the DCS gRPC wrapper sub-app
const dcsGrpcWrapper = await builder.addNodeApp("dcs-grpc-wrapper", "./src/dcs-grpc-wrapper", "api.ts")
    .withHttpEndpoint({ port: 3000, env: "PORT", name: "dcs-grpc-wrapper" })
    .withEnvironment("DCS_GRPC_PROTO", protoPath)
    .withMcpServer({ path: "/mcp/dcs-grpc-wrapper", endpointName: "dcs-grpc-wrapper" });

const dcsGateway = await builder.addNodeApp("dcs-gateway", "./dcs-grpc-wrapper", "dcs-gateway.ts")
    .withReference(redis)
    .waitFor(redis);


const picture = await builder.addNodeApp("agent-picture", "./agents/picture", "main.ts")
    .withReference(dcsGateway)
    .withReference(redis)
    .waitFor(dcsGateway)
    .waitFor(redis);


const commanderAgent = await builder.addNodeApp("agent-commander", "./agents/commander", "main.ts")
    .withReference(dcsGateway)
    .withReference(redis)
    .waitFor(dcsGateway)
    .waitFor(redis);

await builder.build().run();