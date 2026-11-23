import mongoose, { Schema } from "mongoose";

const cvSchema = new Schema(
  {
    slug: { type: String, enum: ["professional", "academic", "europass"], required: true, unique: true },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    sourceType: { type: String, enum: ["upload", "url"], default: "url" },
    url: { type: String, trim: true, maxlength: 2000, default: "" },
    publicId: { type: String, trim: true, default: "" },
    downloadName: { type: String, trim: true, maxlength: 120, default: "" },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CV = mongoose.models.CV || mongoose.model("CV", cvSchema);
