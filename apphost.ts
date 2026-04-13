import os from 'node:os';
import path from 'node:path';
import { createBuilder } from './.modules/aspire.js';

const builder = await createBuilder();

const protoPath = path.join(
    os.homedir(),
    "Saved Games", "DCS", "Docs", "DCS-gRPC", "protos", "dcs", "dcs.proto"
);

// Add the DCS gRPC wrapper sub-app
const dcsGrpcWrapper = await builder.addNodeApp("dcs-grpc-wrapper", "./dist/dcs-grpc-wrapper", "api.js")
    .withHttpEndpoint({ port: 3000, env: "PORT", name: "dcs-grpc-wrapper" })
    .withEnvironment("DCS_GRPC_PROTO", protoPath)
    .withMcpServer({ path: "/mcp/dcs-grpc-wrapper", endpointName: "dcs-grpc-wrapper" });

await builder.build().run();