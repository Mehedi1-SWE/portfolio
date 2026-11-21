import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Skill } from "@/models/Skill";

export async function GET() {
  try { await connectMongoDB(); return NextResponse.json(await Skill.find().sort({ category: 1, name: 1 }).lean()); }
  catch { return NextResponse.json({ error: "Unable to load skills." }, { status: 500 }); }
}
export async function POST(request: Request) {
  const denied = requireAdmin(request); if (denied) return denied;
  try { await connectMongoDB(); return NextResponse.json(await Skill.create(await request.json()), { status: 201 }); }
  catch { return NextResponse.json({ error: "Unable to create skill." }, { status: 400 }); }
}
