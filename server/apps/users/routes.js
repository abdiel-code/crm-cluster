import express from "express";
import validateToken from "../../core/middleware/validateToken.js";
import { getProfile, updateProfile, deleteProfile } from "./controller.js";
import validateRole from "../../core/middleware/validateRole.js";

const router = express.Router();

router.get("/me", validateToken, getProfile);
router.put("/me", validateToken, updateProfile);
router.delete("/me", validateToken, validateRole("admin"), deleteProfile);

export default router;
