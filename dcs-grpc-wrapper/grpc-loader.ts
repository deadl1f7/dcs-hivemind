import fs from 'fs';
import path from 'path';
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
        // Get the parent directory of the proto file for include paths
        const protoDir = path.dirname(protoPath);

        const packageDef = protoLoader.loadSync(protoPath, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
            includeDirs: [protoDir, path.dirname(protoDir)],
        });

        const grpcObject = loadPackageDefinition(packageDef);
        const catalogue: ProtoCatalogue = grpcObject;

        // Try to find and instantiate the service, but don't fail if it doesn't exist
        // We can still use the catalogue for introspection
        const servicePackage = (grpcObject as any)[packageName];
        const Service = servicePackage?.[serviceName];

        let client: DynamicGrpcClient | null = null;

        if (Service) {
            client = new Service(target, credentials.createInsecure()) as DynamicGrpcClient;
            console.log(`[gRPC Loader] Singleton initialized for ${packageName}.${serviceName} at ${target}`);
        } else {
            console.warn(`[gRPC Loader] Service ${packageName}.${serviceName} not found. Operating in catalogue-only mode.`);
        }

        instance = { client, catalogue };
        console.log(`[gRPC Loader] Proto catalogue loaded with ${Object.keys(catalogue).length} packages`);

    } catch (err) {
        console.error(`[gRPC Loader] Critical failure loading proto:`, err);
        instance = { client: null, catalogue: null };
    }

    return instance;
}