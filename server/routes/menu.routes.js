const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const { getMenu, getPizzaById } = require("../controllers/menu.controller");

// Get all pizzas
router.get("/", verifyToken, getMenu);

// Get single pizza by ID
router.get("/:id", verifyToken, getPizzaById);

module.exports = router;


