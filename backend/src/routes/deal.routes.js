import express from "express";
import { getAllDeals, getDealById } from "../controllers/deal.controller.js";

const router = express.Router();

router.get("/", getAllDeals);
router.get("/:id", getDealById);

export default router;
