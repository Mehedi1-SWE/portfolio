
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Project } from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectMongoDB();

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Projects GET API error:", error);

    return NextResponse.json(
      { error: "Unable to load projects." },
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
        { error: "Invalid project data." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const project = await Project.create(body);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Projects POST API error:", error);

    return NextResponse.json(
      { error: "Unable to create project." },
      { status: 400 }
    );
  }
}
