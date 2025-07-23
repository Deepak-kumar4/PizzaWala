// routes/protected.routes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

