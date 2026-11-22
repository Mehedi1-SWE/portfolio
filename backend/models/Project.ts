
import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: true, trim: true },
        image: { type: String, trim: true },
        technologies: {
            type: [String],
            default: [],
        },
        githubUrl: { type: String, trim: true },
        liveUrl: { type: String, trim: true },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Project =
    mongoose.models.Project ||
    mongoose.model("Project", projectSchema);
