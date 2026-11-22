import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { AcademicRecord } from "@/models/AcademicRecord";

type Context = { params: Promise<{ id: string }> };

const allowedFields = [
  "category", "title", "institution", "issuer", "result", "date",
  "expiryDate", "description", "credentialId", "credentialUrl",
  "documentUrl", "isPublished", "sortOrder",
] as const;

export async function PATCH(request: Request, context: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid record ID." }, { status: 400 });
    }
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid academic record data." }, { status: 400 });
    }
    const updates = Object.fromEntries(
      allowedFields.filter((field) => Object.prototype.hasOwnProperty.call(body, field)).map((field) => [field, body[field]])
    );
    await connectMongoDB();
    const record = await AcademicRecord.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!record) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ record });
  } catch (error) {
    console.error("Academic PATCH API error:", error);
    return NextResponse.json({ error: "Unable to update academic record. Check the fields and try again." }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid record ID." }, { status: 400 });
    }
    await connectMongoDB();
    const record = await AcademicRecord.findByIdAndDelete(id);
    if (!record) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Academic DELETE API error:", error);
    return NextResponse.json({ error: "Unable to delete academic record." }, { status: 500 });
  }
}
