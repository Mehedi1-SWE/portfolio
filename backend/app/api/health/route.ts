
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET() {
    try {
        await connectMongoDB();

        return NextResponse.json({
            success: true,
            message: "Backend and MongoDB connected successfully",
        });
    } catch (error) {
        console.error("Database connection error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "MongoDB connection failed",
            },
            { status: 500 }
        );
    }
}
