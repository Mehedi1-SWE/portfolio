
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "portfolio_admin";

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

export function createAdminSession() {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  const payload = Buffer.from(
    JSON.stringify({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
    })
  ).toString("base64url");

  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

function isValidSession(token: string) {
  const secret = getSessionSecret();
  if (!secret) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;

  const expectedSignature = createHmac("sha256", secret)
    .update(payload)
    .digest();

  let actualSignature: Buffer;

  try {
    actualSignature = Buffer.from(signature, "base64url");
  } catch {
    return false;
  }

  if (
    actualSignature.length !== expectedSignature.length ||
    !timingSafeEqual(actualSignature, expectedSignature)
  ) {
    return false;
  }

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    return typeof data.exp === "number" &&
      data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function requireAdmin(request: Request) {
  if (!process.env.ADMIN_API_KEY || !getSessionSecret()) {
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 503 }
    );
  }

  const cookie = request.headers.get("cookie") || "";

  const session = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);

  if (!session || !isValidSession(session)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  return null;
}
