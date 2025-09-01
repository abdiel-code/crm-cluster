import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./apps/auth/routes.js";
import userRoutes from "./apps/users/routes.js";
import cors from "./core/middleware/cors.js";
import taskRoutes from "./apps/tasks/routes.js";
import connectRoute from "./apps/connections/routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use("/api/connections", connectRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", taskRoutes);

export default app;
