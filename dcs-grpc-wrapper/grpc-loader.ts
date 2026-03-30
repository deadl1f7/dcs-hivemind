import fs from 'fs';
import protoLoader from '@grpc/proto-loader';
import { Client, credentials, GrpcObject, loadPackageDefinition } from '@grpc/grpc-js';

// --- Types ---
export interface LoaderOptions {
    protoPath: string;
    target: string;
    packageName?: string;
    serviceName?: string;
}

export type DynamicGrpcClient = Client & {
    [methodName: string]: (
        payload: any,
        callback: (err: Error | null, response: any) => void
    ) => void;
};

export type ProtoCatalogue = GrpcObject;

// --- Singleton State ---
let instance: { client: DynamicGrpcClient | null; catalogue: ProtoCatalogue | null } | null = null;

/**
 * Returns the existing gRPC client instance or initializes a new one.
 * Ensures REST and MCP are looking at the exact same object in memory.
 */
export function getGrpcClient(options: LoaderOptions) {
    if (instance) {
        return instance;
    }

    const {
        protoPath,
        target,
        packageName = process.env.DCS_GRPC_PACKAGE || 'dcs',
        serviceName = process.env.DCS_GRPC_SERVICE || 'DcsService'
    } = options;

    if (!fs.existsSync(protoPath)) {
        console.warn(`[gRPC Loader] Proto not found at ${protoPath}. Initializing in stub mode.`);
        instance = { client: null, catalogue: null };
        return instance;
    }

    try {
        const packageDef = protoLoader.loadSync(protoPath, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        const grpcObject = loadPackageDefinition(packageDef);
        const catalogue: ProtoCatalogue = grpcObject;

        const servicePackage = (grpcObject as any)[packageName];
        const Service = servicePackage?.[serviceName];

        if (!Service) {
            console.warn(`[gRPC Loader] Service ${packageName}.${serviceName} not found in proto.`);
            instance = { client: null, catalogue };
            return instance;
        }

        const client = new Service(target, credentials.createInsecure()) as DynamicGrpcClient;

        instance = { client, catalogue };
        console.log(`[gRPC Loader] Singleton initialized for ${packageName}.${serviceName} at ${target}`);

    } catch (err) {
        console.error(`[gRPC Loader] Critical failure loading proto:`, err);
        instance = { client: null, catalogue: null };
    }

    return instance;
}