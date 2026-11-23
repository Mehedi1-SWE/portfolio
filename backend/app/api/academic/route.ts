import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { AcademicRecord } from "@/models/AcademicRecord";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await connectMongoDB();
    const denied = requireAdmin(request);
    const filter = denied ? { isPublished: true } : {};
    const records = await AcademicRecord.find(filter).sort({ sortOrder: 1, date: -1, createdAt: -1 }).lean();
    return NextResponse.json(records);
  } catch (error) {
    console.error("Academic GET API error:", error);
    return NextResponse.json({ error: "Unable to load academic records." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid academic record data." }, { status: 400 });
    }
    await connectMongoDB();
    const record = await AcademicRecord.create(body);
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Academic POST API error:", error);
    return NextResponse.json({ error: "Unable to create academic record. Check required fields and category." }, { status: 400 });
  }
}
