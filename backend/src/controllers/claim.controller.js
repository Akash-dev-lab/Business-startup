import { Claim } from "../models/claim.model.js";
import { Deal } from "../models/deal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new claim
export const createClaim = asyncHandler(async (req, res) => {
    const { dealId } = req.params;
    const userId = req.user._id;

    // 1. Fetch Deal
    const deal = await Deal.findById(dealId);
    if (!deal) {
        return res.status(404).json({ message: "Deal not found" });
    }

    // 2. Check Logic for Locked Deals
    if (deal.accessLevel === "locked" && !req.user.isVerified) {
        return res
            .status(403)
            .json({ message: "Verified account required to claim this deal" });
    }

    // 3. Create Claim
    try {
        const newClaim = await Claim.create({
            userId,
            dealId,
            status: "pending",
        });

        res.status(201).json({
            message: "Deal claimed successfully",
            claim: newClaim,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res
                .status(409)
                .json({ message: "You have already claimed this deal" });
        }
        throw error; // Let central error handler handle it
    }
});

// Get my claims
export const getMyClaims = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const claims = await Claim.find({ userId }).populate("dealId");

    res.status(200).json(claims);
});
