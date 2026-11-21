import { NextResponse } from "next/server";

export function requireAdmin(request: Request) {
  const adminKey = process.env.ADMIN_API_KEY;
  const authorization = request.headers.get("authorization");
  if (!adminKey) {
    return NextResponse.json({ error: "Admin API is not configured." }, { status: 503 });
  }
  if (authorization !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}
