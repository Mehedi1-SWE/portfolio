import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { CV } from "@/models/CV";

export const dynamic = "force-dynamic";

const defaults = [
  { slug: "professional", title: "Professional CV", sourceType: "url", url: "/professional-cv.pdf", downloadName: "Mehedi-Hasan-Professional-CV.pdf", isActive: true, sortOrder: 1 },
  { slug: "academic", title: "Academic CV", sourceType: "url", url: "/academic-cv.pdf", downloadName: "Mehedi-Hasan-Academic-CV.pdf", isActive: true, sortOrder: 2 },
  { slug: "europass", title: "Europass CV", sourceType: "url", url: "/europass-cv.pdf", downloadName: "Mehedi-Hasan-Europass-CV.pdf", isActive: true, sortOrder: 3 },
] as const;

export async function GET(request: Request) {
  try {
    await connectMongoDB();
    await Promise.all(defaults.map((item) => CV.updateOne({ slug: item.slug }, { $setOnInsert: item }, { upsert: true })));
    const admin = !requireAdmin(request);
    const records = await CV.find(admin ? {} : { isActive: true }).sort({ sortOrder: 1 }).lean();
    return NextResponse.json(records);
  } catch (error) {
    console.error("CV GET API error:", error);
    return NextResponse.json({ error: "Unable to load CV files." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    const allowed = ["title", "sourceType", "url", "publicId", "downloadName", "isActive", "sortOrder"];
    if (!body || !["professional", "academic", "europass"].includes(body.slug)) {
      return NextResponse.json({ error: "Invalid CV category." }, { status: 400 });
    }
    const updates = Object.fromEntries(allowed.filter((key) => Object.prototype.hasOwnProperty.call(body, key)).map((key) => [key, body[key]]));
    if (updates.url && typeof updates.url === "string" && !updates.url.startsWith("/") && !/^https:\/\//i.test(updates.url)) {
      return NextResponse.json({ error: "CV URL must use HTTPS." }, { status: 400 });
    }
    await connectMongoDB();
    const record = await CV.findOneAndUpdate({ slug: body.slug }, { $set: updates }, { new: true, runValidators: true });
    if (!record) return NextResponse.json({ error: "CV record not found." }, { status: 404 });
    return NextResponse.json(record);
  } catch (error) {
    console.error("CV PATCH API error:", error);
    return NextResponse.json({ error: "Unable to update CV settings." }, { status: 400 });
  }
}
