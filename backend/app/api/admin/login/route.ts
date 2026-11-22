import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
  try {
    const body = await request.json();
    if (typeof body.key !== "string" || body.key !== key) return NextResponse.json({ error: "Invalid admin key." }, { status: 401 });
    const response = NextResponse.json({ success: true });
    response.cookies.set("portfolio_admin", key, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
    return response;
  } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
}
