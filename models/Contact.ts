import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true, maxlength: 100, trim: true },
  email: { type: String, required: true, maxlength: 254, trim: true, lowercase: true },
  subject: { type: String, required: true, maxlength: 160, trim: true },
  message: { type: String, required: true, maxlength: 3000, trim: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
