import express from "express";
import { register, login, getMe, verifyMe } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyJWT, getMe);
router.post("/verify-me", verifyJWT, verifyMe);


export default router;
