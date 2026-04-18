export const logInfo = (message: string, params?: Record<string, unknown>) => {
    if (process.env.DEBUG) {
        console.log(`[INFO] ${message}`, params || '');
    }
};

export const logError = (message: string, error?: Error | unknown) => {
    console.error(`[ERROR] ${message}`, error instanceof Error ? { message: error.message, stack: error.stack } : error);
}

export const logWarning = (message: string, params?: Record<string, unknown>) => {
    console.warn(`[WARN] ${message}`, params || '');
}