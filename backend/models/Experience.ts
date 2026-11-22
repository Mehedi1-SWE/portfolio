
import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema(
    {
        company: { type: String, required: true, trim: true },
        position: { type: String, required: true, trim: true },
        startDate: { type: String, required: true, trim: true },
        endDate: { type: String, trim: true },
        location: { type: String, trim: true },
        responsibilities: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export const Experience =
    mongoose.models.Experience ||
    mongoose.model("Experience", experienceSchema);
