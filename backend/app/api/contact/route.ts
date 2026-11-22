import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const honeypot = typeof body.website === "string" ? body.website.trim() : "";

    if (honeypot) return NextResponse.json({ success: true });
    if (!name || !email || !subject || !message) return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    if (name.length > 100 || subject.length > 160 || message.length > 3000) return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });

    await connectMongoDB();
    const saved = await Contact.create({ name, email, subject, message });

    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || "mehedi.se4@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL;
    if (resendKey && from) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from,
            to: [to],
            reply_to: email,
            subject: `Portfolio contact: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
          }),
        });
      } catch {
        // The message is safely stored in MongoDB even if email delivery is unavailable.
      }
    }

    return NextResponse.json({ success: true, message: "Your message has been received.", id: saved._id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}
