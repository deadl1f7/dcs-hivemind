import express, { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import { Client, GrpcObject } from "@grpc/grpc-js";

export interface GrpcRouteOptions {
    grpcClient: Client | any;
    protoCatalogue: GrpcObject | null;
    logFilePath?: string;
}

export const addRoutes = (options: GrpcRouteOptions): Router => {
    const { grpcClient, protoCatalogue, logFilePath = 'grpc-call-log.jsonl' } = options;
    const router = express.Router();

    if (!protoCatalogue) {
        throw new Error('Proto catalogue is required to set up routes');
    }
    // 1. Health & Discovery
    router.get('/health', (_req, res) => {
        res.json({
            status: 'ok',
            grpcClientConnected: !!grpcClient,
            availableMethods: Object.keys(protoCatalogue || {})
        });
    });

    // 2. Metadata Export
    router.get('/api/proto/catalogue', (_req, res) => {
        if (!protoCatalogue) {
            return res.status(503).json({ error: 'Proto catalogue not initialized' });
        }
        res.json(protoCatalogue);
    });

    // 3. Dynamic gRPC Invocation
    router.post('/api/dcs/:methodName', (req: Request, res: Response) => {
        const { methodName } = req.params;

        // A. Validate methodName type and existence in Catalogue
        if (typeof methodName !== 'string' || !protoCatalogue[methodName]) {
            return res.status(404).json({
                error: `Invalid or unknown gRPC method: ${methodName}`,
                suggestion: "Check /api/proto/catalogue for valid method names."
            });
        }

        // B. Guard gRPC Client existence
        if (!grpcClient) {
            return res.status(503).json({ error: 'gRPC client is not initialized' });
        }

        // C. Check implementation on the client
        const grpcFunc = (grpcClient as any)[methodName];
        if (typeof grpcFunc !== 'function') {
            return res.status(501).json({
                error: `Method '${methodName}' defined in proto but not implemented on client.`
            });
        }

        const payload = req.body || {};

        // D. Execute gRPC Call
        grpcFunc.call(grpcClient, payload, (err: any, response: any) => {
            const logEntry = {
                timestamp: new Date().toISOString(),
                method: methodName,
                request: payload,
                response: err ? null : response,
                error: err ? (err.message || err) : null,
            };

            // Logging
            try {
                const fullLogPath = path.resolve(process.cwd(), logFilePath);
                fs.appendFileSync(fullLogPath, `${JSON.stringify(logEntry)}\n`, 'utf8');
            } catch (logErr) {
                console.warn('[dcs-grpc-wrapper] Log failed:', logErr);
            }

            if (err) {
                return res.status(500).json({
                    error: err.message || 'gRPC Error',
                    code: err.code,
                    details: err
                });
            }

            res.json(response);
        });
    });

    return router;
};