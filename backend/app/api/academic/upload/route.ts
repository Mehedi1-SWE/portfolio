import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { requireAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp"]);

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "File storage is not configured. Add Cloudinary credentials to the backend environment." }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
    }
    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File must be larger than 0 bytes and no bigger than 10 MB." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Only PDF, PNG, JPG and WEBP files are supported." }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = "portfolio/academic";
    const signatureBase = `folder=${folder}&timestamp=${timestamp}`;
    const signature = createHash("sha1").update(signatureBase + apiSecret).digest("hex");

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("api_key", apiKey);
    uploadData.append("timestamp", timestamp);
    uploadData.append("folder", folder);
    uploadData.append("signature", signature);

    const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: "POST",
      body: uploadData,
      cache: "no-store",
    });
    const result = await cloudinaryResponse.json();
    if (!cloudinaryResponse.ok || typeof result.secure_url !== "string") {
      console.error("Cloudinary upload failed:", result.error?.message || "Unknown error");
      return NextResponse.json({ error: "Cloud storage rejected the file. Check Cloudinary settings and try again." }, { status: 502 });
    }

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id, format: result.format, bytes: result.bytes }, { status: 201 });
  } catch (error) {
    console.error("Academic upload API error:", error);
    return NextResponse.json({ error: "Unable to upload file." }, { status: 500 });
  }
}
