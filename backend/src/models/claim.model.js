import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        dealId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Deal",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

// Constraint: One user can claim a deal only once
claimSchema.index({ userId: 1, dealId: 1 }, { unique: true });

export const Claim = mongoose.model("Claim", claimSchema);
