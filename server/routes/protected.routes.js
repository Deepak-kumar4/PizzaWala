const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const User = require("../models/user.model");

// Secure profile route - fetch user from DB
router.get("/profile", verifyToken, async (req, res) => {
  try {
    console.log("Decoded user from token:", req.user); // DEBUG

    const userId = req.user.id || req.user._id; // fallback for _id if present
    if (!userId) {
      return res.status(400).json({ message: "Invalid token payload: missing user ID" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Error in /profile route:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;




