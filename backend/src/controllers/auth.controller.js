import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

// Register User
export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        message: "User registered successfully",
        user: newUser,
    });
});

// Login User
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: process.env.JWT_EXPIRY || "1d" }
    );

    res.status(200).json({
        message: "Login successful",
        token,
        user,
    });
});
