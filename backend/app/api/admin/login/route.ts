
import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/adminAuth";
import { timingSafeEqual } from "crypto";

export async function POST(request: Request) {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body.key !== "string") {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const providedKey = Buffer.from(body.key);
    const expectedKey = Buffer.from(adminKey);

    const validKey =
      providedKey.length === expectedKey.length &&
      timingSafeEqual(providedKey, expectedKey);

    if (!validKey) {
      return NextResponse.json(
        { error: "Invalid admin key." },
        { status: 401 }
      );
    }

    const session = createAdminSession();
    const response = NextResponse.json({ success: true });

    response.cookies.set("portfolio_admin", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Unable to complete login." },
      { status: 400 }
    );
  }
}
