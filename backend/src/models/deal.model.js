import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        accessLevel: {
            type: String,
            enum: ["public", "locked"],
            required: true,
            default: "public",
        },
        eligibilityText: {
            type: String,
            required: true,
        },
        partnerName: {
            type: String,
            // optional but nice
        },
    },
    { timestamps: true }
);

export const Deal = mongoose.model("Deal", dealSchema);
