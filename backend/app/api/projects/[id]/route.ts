
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Project } from "@/models/Project";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid record ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid project data." },
        { status: 400 }
      );
    }

    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;

    await connectMongoDB();

    const record = await Project.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!record) {
      return NextResponse.json(
        { error: "Record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ record });
  } catch (error) {
    console.error("Project PATCH API error:", error);

    return NextResponse.json(
      { error: "Unable to update record. Check the fields and try again." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, context: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid record ID." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const record = await Project.findByIdAndDelete(id);

    if (!record) {
      return NextResponse.json(
        { error: "Record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project DELETE API error:", error);

    return NextResponse.json(
      { error: "Unable to delete record." },
      { status: 500 }
    );
  }
}
