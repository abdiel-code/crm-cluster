import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./apps/auth/routes.js";
import userRoutes from "./apps/users/routes.js";
import cors from "./core/middleware/cors.js";

/*
 * Main App of CRM Cluster
 *  - Load base middleware (cors, express.json, cookie-parser)
 *  - Load routes (auth, users)
 *  - Personalized CORS configuration

*/

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
