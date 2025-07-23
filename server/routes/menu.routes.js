// routes/menu.routes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

// GET /api/menu
router.get("/", verifyToken, async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching menu", error: err.message });
  }
});

module.exports = router;
