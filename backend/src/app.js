import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middlewares.js";
import authRoutes from "./routes/auth.routes.js";
import dealRoutes from "./routes/deal.routes.js";
import claimRoutes from "./routes/claim.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/claims", claimRoutes);
app.use(errorHandler);

export { app };
