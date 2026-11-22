import { NextResponse } from "next/server";

export function requireAdmin(request: Request) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return NextResponse.json({ error: "Admin API is not configured." }, { status: 503 });
  const authorization = request.headers.get("authorization");
  const cookie = request.headers.get("cookie") || "";
  const session = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("portfolio_admin="))?.slice("portfolio_admin=".length);
  if (authorization !== `Bearer ${adminKey}` && session !== adminKey) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}
