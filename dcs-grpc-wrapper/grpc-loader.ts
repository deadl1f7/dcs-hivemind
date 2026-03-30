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

        // Create a dynamic client that aggregates all services from the proto
        const dynamicClient: any = {};
        const servicePackage = (grpcObject as any)[packageName];

        // Recursively find all service constructors in the proto hierarchy
        function collectServices(obj: any, depth = 0): void {
            if (!obj || depth > 5) return; // Prevent infinite recursion

            for (const key in obj) {
                const value = obj[key];
                // Check if this is a service constructor (has 'service' in its name or is a function)
                if (typeof value === 'function' && value.service) {
                    const serviceClient = new value(target, credentials.createInsecure());
                    // Map all RPC methods from this service
                    for (const method in serviceClient) {
                        if (typeof serviceClient[method] === 'function') {
                            dynamicClient[method] = serviceClient[method].bind(serviceClient);
                        }
                    }
                    console.log(`[gRPC Loader] Loaded service: ${key}`);
                } else if (typeof value === 'object' && value !== null) {
                    // Recurse into nested objects to find more services
                    collectServices(value, depth + 1);
                }
            }
        }

        collectServices(servicePackage || grpcObject);

        let client: DynamicGrpcClient | null = null;
        if (Object.keys(dynamicClient).length > 0) {
            client = dynamicClient as DynamicGrpcClient;
        }

        if (client && Object.keys(dynamicClient).length > 0) {
            console.log(`[gRPC Loader] Dynamic client initialized with ${Object.keys(dynamicClient).length} RPC methods at ${target}`);
        } else {
            console.warn(`[gRPC Loader] No services found in proto. Operating in catalogue-only mode.`);
        }

        // Use the service package as catalogue for introspection (unwrap from grpcObject)
        const catalogue: ProtoCatalogue = servicePackage || grpcObject;
        const availableServices = Object.keys(servicePackage || {});

        instance = { client, catalogue };
        console.log(`[gRPC Loader] Proto catalogue loaded with ${availableServices.length} service packages: ${availableServices.join(', ')}`);

    } catch (err) {
        console.error(`[gRPC Loader] Critical failure loading proto:`, err);
        instance = { client: null, catalogue: null };
    }

    return instance;
}