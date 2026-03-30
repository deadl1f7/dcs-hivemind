import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { DynamicGrpcClient, ProtoCatalogue } from "./grpc-loader.js";
import type { Request, Response } from 'express';

export async function createMcpServer(
    grpcClient: DynamicGrpcClient | null,
    protoCatalogue: ProtoCatalogue | null) {


    // Create server instance once at startup
    const mcpServer = new McpServer({
        name: "dcs-grpc-wrapper",
        version: "1.0.0",
    });

    // Register tools once
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

    // Create transport for this request
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined // stateless
    });

    // Connect server to transport
    await mcpServer.connect(transport);

    const app = createMcpExpressApp();

    app.post('/', async (req: Request, res: Response) => {
        console.log(`[MCP] Handling MCP request... path: ${req.path}`);

        try {

            // Handle the request
            await transport.handleRequest(req, res, req.body);
        } catch (error) {
            console.error('[MCP] Error handling request:', error);
            res.status(500).json({ error: 'MCP request failed' });
        }
    });



    console.log('[MCP] MCP Express app configured with POST handler');

    return app;
}