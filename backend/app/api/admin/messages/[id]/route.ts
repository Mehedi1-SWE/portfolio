
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Contact } from "@/models/Contact";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid message ID." }, { status: 400 });
    }

    const body = await request.json();
    const reply = typeof body.reply === "string" ? body.reply.trim() : "";
    if (!reply || reply.length > 5000) {
      return NextResponse.json({ error: "Reply is required and must be 5000 characters or fewer." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !from) {
      return NextResponse.json({ error: "Email service is not configured. Add RESEND_API_KEY and CONTACT_FROM_EMAIL to backend environment variables." }, { status: 503 });
    }

    await connectMongoDB();
    const contact = await Contact.findById(id);
    if (!contact) return NextResponse.json({ error: "Message not found." }, { status: 404 });

    const escapedReply = reply.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [contact.email],
        reply_to: process.env.CONTACT_TO_EMAIL || undefined,
        subject: `Re: ${contact.subject}`,
        text: `Hello ${contact.name},\n\n${reply}\n\nRegards,\nMehedi Hasan`,
        html: `<p>Hello ${contact.name.replace(/[&<>"]/g, "")},</p><p>${escapedReply.replace(/\n/g, "<br>")}</p><p>Regards,<br>Mehedi Hasan</p>`,
      }),
    });
    const emailResult = await emailResponse.json();
    if (!emailResponse.ok) {
      console.error("Resend email error:", emailResult);
      return NextResponse.json({ error: emailResult.message || "Email could not be sent. Check your Resend configuration and verified sender domain." }, { status: 502 });
    }

    contact.replies.push({ message: reply, sentAt: new Date() });
    contact.isRead = true;
    await contact.save();
    return NextResponse.json({ success: true, message: "Reply sent successfully.", contact });
  } catch (error) {
    console.error("Admin reply error:", error);
    return NextResponse.json({ error: "Unable to send reply right now." }, { status: 500 });
  }
}

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
