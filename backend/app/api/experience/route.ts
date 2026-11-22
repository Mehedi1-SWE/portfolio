import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Experience } from "@/models/Experience";

export async function GET() {
  try { await connectMongoDB(); return NextResponse.json(await Experience.find().sort({ createdAt: -1 }).lean()); }
  catch { return NextResponse.json({ error: "Unable to load experience." }, { status: 500 }); }
}
export async function POST(request: Request) {
  const denied = requireAdmin(request); if (denied) return denied;
  try { await connectMongoDB(); return NextResponse.json(await Experience.create(await request.json()), { status: 201 }); }
  catch { return NextResponse.json({ error: "Unable to create experience." }, { status: 400 }); }
}
