
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Contact } from "@/models/Contact";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid message ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (typeof body.isRead !== "boolean") {
      return NextResponse.json(
        { error: "isRead must be boolean." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const message = await Contact.findByIdAndUpdate(
      id,
      { isRead: body.isRead },
      { new: true }
    );

    if (!message) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Admin message update error:", error);

    return NextResponse.json(
      { error: "Unable to update message." },
      { status: 500 }
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
        { error: "Invalid message ID." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin message delete error:", error);

    return NextResponse.json(
      { error: "Unable to delete message." },
      { status: 500 }
    );
  }
}
