
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Contact } from "@/models/Contact";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    await connectMongoDB();

    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Admin messages API error:", error);

    return NextResponse.json(
      { error: "Unable to load messages." },
      { status: 500 }
    );
  }
}
