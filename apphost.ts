// Aspire TypeScript AppHost
// For more information, see: https://aspire.dev

import { createBuilder } from './.modules/aspire.js';

const builder = await createBuilder();

// Add your resources here, for example:
// const redis = await builder.addContainer("cache", "redis:latest");
// const postgres = await builder.addPostgres("db");

// Add the DCS gRPC wrapper sub-app
const dcsGrpcWrapper = await builder.addNodeApp("dcs-grpc-wrapper", "./dist/dcs-grpc-wrapper", "api.js")
    .withHttpEndpoint({ port: 3000, env: "PORT", name: "dcs-grpc-wrapper" })
    .withEnvironment("DCS_GRPC_PROTO", "C:\\Users\\marti\\Saved Games\\DCS\\Docs\\DCS-gRPC\\protos\\dcs\\dcs.proto")
    .withMcpServer({ path: "/mcp/dcs-grpc-wrapper", endpointName: "dcs-grpc-wrapper" });

await builder.build().run();