import { NextRequest, NextResponse } from "next/server";

const allowedMethods = "GET, POST, DELETE, OPTIONS";
const allowedHeaders = "Content-Type";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const configuredOrigin = process.env.FRONTEND_ORIGIN;
  const allowedOrigin = configuredOrigin && origin === configuredOrigin ? origin : "";

  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    if (allowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
      response.headers.set("Access-Control-Allow-Methods", allowedMethods);
      response.headers.set("Access-Control-Allow-Headers", allowedHeaders);
      response.headers.set("Vary", "Origin");
    }
    return response;
  }

  const response = NextResponse.next();
  if (allowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    response.headers.set("Vary", "Origin");
  }
  return response;
}

export const config = { matcher: ["/api/contact", "/api/cvs"] };
