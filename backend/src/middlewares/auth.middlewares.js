import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.headers.authorization?.replace("Bearer ", "") ||
            req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "default_secret_key"
        );

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }
};
