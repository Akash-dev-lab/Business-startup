import { Deal } from "../models/deal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all deals
export const getAllDeals = asyncHandler(async (req, res) => {
    const deals = await Deal.find();
    res.status(200).json(deals);
});

// Get deal by ID
export const getDealById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deal = await Deal.findById(id);

    if (!deal) {
        return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal);
});
