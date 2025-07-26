const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const User = require("../models/user.model"); // ✅ Import User model

// ✅ Secure profile route - fetch user from DB
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // remove hashed password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user }); // ✅ Send full user with role
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;



