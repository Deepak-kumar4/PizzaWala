const express = require("express");
const router = express.Router();
const { getAllPizzas, createPizza, getPizzaById } = require("../controllers/pizza.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

// Public route - anyone can view pizzas
router.get("/", getAllPizzas);

// Get single pizza by ID
router.get("/:id", getPizzaById);

// Admin-only route - only logged-in admins can create pizzas
router.post("/", verifyToken, isAdmin, createPizza);

module.exports = router;



