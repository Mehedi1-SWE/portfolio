import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Project } from "@/models/Project";

export async function GET() {
  try { await connectMongoDB(); return NextResponse.json(await Project.find().sort({ createdAt: -1 }).lean()); }
  catch { return NextResponse.json({ error: "Unable to load projects." }, { status: 500 }); }
}
export async function POST(request: Request) {
  const denied = requireAdmin(request); if (denied) return denied;
  try { await connectMongoDB(); return NextResponse.json(await Project.create(await request.json()), { status: 201 }); }
  catch { return NextResponse.json({ error: "Unable to create project." }, { status: 400 }); }
}
