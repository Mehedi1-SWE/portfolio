
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Experience } from "@/models/Experience";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectMongoDB();

    const experiences = await Experience.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Experience GET API error:", error);

    return NextResponse.json(
      { error: "Unable to load experience." },
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
        { error: "Invalid experience data." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const experience = await Experience.create(body);

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Experience POST API error:", error);

    return NextResponse.json(
      { error: "Unable to create experience." },
      { status: 400 }
    );
  }
}
