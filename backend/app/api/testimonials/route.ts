import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Testimonial } from "@/models/Testimonial";

export async function GET() {
  try { await connectMongoDB(); return NextResponse.json(await Testimonial.find().sort({ createdAt: -1 }).lean()); }
  catch { return NextResponse.json({ error: "Unable to load testimonials." }, { status: 500 }); }
}
export async function POST(request: Request) {
  const denied = requireAdmin(request); if (denied) return denied;
  try { await connectMongoDB(); return NextResponse.json(await Testimonial.create(await request.json()), { status: 201 }); }
  catch { return NextResponse.json({ error: "Unable to create testimonial." }, { status: 400 }); }
}
