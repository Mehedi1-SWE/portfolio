import mongoose from "mongoose";
import { setServers } from "node:dns";

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

const cached = global.mongooseCache ?? {
    conn: null,
    promise: null,
};

global.mongooseCache = cached;

export async function connectMongoDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not defined");
    }

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        // Use public DNS resolvers for MongoDB Atlas SRV lookups.
        setServers(["8.8.8.8", "8.8.4.4"]);

        cached.promise = mongoose.connect(uri, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
