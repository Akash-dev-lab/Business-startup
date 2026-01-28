import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createClaim, getMyClaims } from "../controllers/claim.controller.js";

const router = express.Router();

// All claim routes require authentication
router.use(verifyJWT);

router.post("/:dealId", createClaim);
router.get("/my", getMyClaims);

export default router;
