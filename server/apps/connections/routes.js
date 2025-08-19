import express from "express";
const router = express.Router();

router.post("/connect", (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    return res.status(200).json({ message: "User connected", userId });
});

export default router;