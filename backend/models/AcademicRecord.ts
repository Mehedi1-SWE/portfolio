import mongoose, { Schema } from "mongoose";

const academicRecordSchema = new Schema(
  {
    category: { type: String, enum: ["education", "academic-certification", "professional-certification", "achievement"], required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    institution: { type: String, trim: true, maxlength: 180 },
    issuer: { type: String, trim: true, maxlength: 180 },
    result: { type: String, trim: true, maxlength: 100 },
    date: { type: String, trim: true, maxlength: 40 },
    expiryDate: { type: String, trim: true, maxlength: 40 },
    description: { type: String, trim: true, maxlength: 1200 },
    credentialId: { type: String, trim: true, maxlength: 180 },
    credentialUrl: { type: String, trim: true, maxlength: 1000 },
    documentUrl: { type: String, trim: true, maxlength: 1000 },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const AcademicRecord =
  mongoose.models.AcademicRecord ||
  mongoose.model("AcademicRecord", academicRecordSchema);
