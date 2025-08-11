import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./apps/auth/routes.js";
import userRoutes from "./apps/users/routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
