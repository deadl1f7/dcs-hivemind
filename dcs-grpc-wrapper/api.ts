import express from 'express';
import path from 'path';
import { addRoutes } from './rest.js';
import { createMcpServer } from './mcp.js';
import { getGrpcClient } from './grpc-loader.js';

const PORT = Number(process.env.PORT) || 3000;

// 1. Initialize gRPC Resources using the helper
const { client: grpcClient, catalogue: protoCatalogue } = getGrpcClient({
    protoPath: process.env.DCS_GRPC_PROTO || path.resolve('proto', 'dcs.proto'),
    target: process.env.DCS_GRPC_TARGET || '127.0.0.1:50051'
});

const app = express();
app.use(express.json());

// 2. Mount REST Router (Legacy/Internal API)
app.use('/api', addRoutes({ grpcClient, protoCatalogue }));

// 3. Setup MCP Server (Model Context Protocol)
try {
    console.log('[MCP] Setting up MCP server...');
    const mcpApp = await createMcpServer(grpcClient, protoCatalogue);

    // Mount MCP app at /mcp/dcs-grpc-wrapper as configured in AppHost
    app.use('/mcp/dcs-grpc-wrapper', mcpApp);
    console.log('[MCP] MCP server mounted at /mcp/dcs-grpc-wrapper');
} catch (error) {
    console.error('[MCP] Failed to setup MCP server:', error);
}

// 4. Start Server with Top-Level Await
try {
    const server = app.listen(PORT, () => {
        console.log(`🚀 Gateway: http://localhost:${PORT}`);
        console.log(`📡 gRPC Client: ${grpcClient ? 'Connected' : 'Stub Mode'}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('Shutting down...');
        server.close();
    });
} catch (err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
}