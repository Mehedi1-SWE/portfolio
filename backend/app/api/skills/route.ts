
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Skill } from "@/models/Skill";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectMongoDB();

        const skills = await Skill.find()
            .sort({ category: 1, name: 1 })
            .lean();

        return NextResponse.json(skills);
    } catch (error) {
        console.error("Skills GET API error:", error);

        return NextResponse.json(
            { error: "Unable to load skills." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const denied = requireAdmin(request);
    if (denied) return denied;

    try {
        const body = await request.json();

        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return NextResponse.json(
                { error: "Invalid skill data." },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const skill = await Skill.create(body);

        return NextResponse.json(skill, { status: 201 });
    } catch (error) {
        console.error("Skills POST API error:", error);

        return NextResponse.json(
            { error: "Unable to create skill." },
            { status: 400 }
        );
    }
}
