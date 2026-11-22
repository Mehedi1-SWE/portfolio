
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { Testimonial } from "@/models/Testimonial";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectMongoDB();

    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Testimonials GET API error:", error);

    return NextResponse.json(
      { error: "Unable to load testimonials." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid testimonial data." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const testimonial = await Testimonial.create(body);

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Testimonials POST API error:", error);

    return NextResponse.json(
      { error: "Unable to create testimonial." },
      { status: 400 }
    );
  }
}
