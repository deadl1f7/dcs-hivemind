import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Router } from "express";
import { z } from "zod";
import { DynamicGrpcClient, ProtoCatalogue } from "./grpc-loader.js";

export function setupMcp(
    grpcClient: DynamicGrpcClient | null,
    protoCatalogue: ProtoCatalogue | null) {
    const mcpServer = new McpServer({
        name: "dcs-grpc-wrapper",
        version: "1.0.0",
    });

    mcpServer.registerTool(
        "get_proto_catalogue",
        {
            description: "Returns the loaded gRPC proto definitions",
        },
        async () => {
            return {
                content: [{ type: "text", text: JSON.stringify(protoCatalogue || {}, null, 2) }],
            };
        }
    );

    mcpServer.registerTool(
        "check_health",
        { description: "Checks the health of the gRPC gateway and connection to DCS" },
        async () => ({
            content: [{
                type: "text",
                text: JSON.stringify({
                    status: "ok",
                    grpcClientConnected: !!grpcClient,
                    timestamp: new Date().toISOString(),
                    mcpVersion: "1.0.0"
                }, null, 2)
            }]
        })
    );

    mcpServer.registerTool(
        "call_grpc_method",
        {
            description: "Invokes a specific gRPC method",
            inputSchema: z.object({
                method: z.string().describe("The gRPC method name"),
                payload: z.object(z.any()).optional().describe("JSON payload for the call"),
            }),
        } as any,
        async (params) => {
            const { method, payload } = params as any;

            if (!grpcClient?.[method]) {
                return {
                    isError: true,
                    content: [{ type: "text", text: `gRPC method ${method} not found` }],
                };
            }

            return new Promise((resolve) => {
                grpcClient[method](payload || {}, (err: any, response: any) => {
                    if (err) {
                        resolve({
                            isError: true,
                            content: [{ type: "text", text: err.message || "gRPC call failed" }],
                        });
                    } else {
                        resolve({
                            content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
                        });
                    }
                });
            });
        }
    );


    const router = Router();
    router.post("/", async (req, res) => {
        try {
            const { method, params } = req.body;

            if (!method) {
                return res.status(400).json({ error: "Missing 'method' in request body" });
            }

            let result: any;

            // Handle registered tools
            switch (method) {
                case "check_health":
                    result = {
                        status: "ok",
                        grpcClientConnected: !!grpcClient,
                        timestamp: new Date().toISOString(),
                        mcpVersion: "1.0.0"
                    };
                    break;

                case "get_proto_catalogue":
                    result = protoCatalogue || {};
                    break;

                case "call_grpc_method":
                    if (!params || !params.method) {
                        return res.status(400).json({ error: "Missing 'method' in params" });
                    }

                    if (!grpcClient?.[params.method]) {
                        return res.status(404).json({ error: `gRPC method ${params.method} not found` });
                    }

                    result = await new Promise((resolve) => {
                        grpcClient[params.method](params.payload || {}, (err: any, response: any) => {
                            if (err) {
                                resolve({ error: err.message || "gRPC call failed" });
                            } else {
                                resolve(response);
                            }
                        });
                    });
                    break;

                default:
                    return res.status(404).json({ error: `Unknown method: ${method}` });
            }

            res.json({ result });
        } catch (err: any) {
            console.error("[MCP Error]", err);
            res.status(500).json({ error: err.message || "MCP Execution Error" });
        }
    });
    return { mcpServer, mcpRouter: router };
}