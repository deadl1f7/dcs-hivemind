import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Router } from "express";
import { z } from "zod";
import { DynamicGrpcClient, ProtoCatalogue } from "./grpc-loader";

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

            const serverInstance = (mcpServer as any).server;

            if (!serverInstance) {
                return res.status(500).json({ error: "Internal MCP Server not initialized" });
            }


            const response = await serverInstance.request(req.body.method, req.body.params);
            res.json(response);
        } catch (err: any) {
            console.error("[MCP Bridge Error]", err);
            res.status(500).json({ error: err.message || "MCP Execution Error" });
        }
    });
    return { mcpServer, mcpRouter: router };
}