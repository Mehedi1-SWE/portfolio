
import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        level: { type: Number, min: 0, max: 100 },
    },
    { timestamps: true }
);

export const Skill =
    mongoose.models.Skill ||
    mongoose.model("Skill", skillSchema);
