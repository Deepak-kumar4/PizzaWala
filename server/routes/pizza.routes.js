const express = require("express");
const router = express.Router();
const {
  getAllPizzas,
  createPizza,
  getPizzaById,
  updatePizza,
  deletePizza,
} = require("../controllers/pizza.controller");

const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

// Public
router.get("/", getAllPizzas);
router.get("/:id", getPizzaById);

// Admin
router.post("/", verifyToken, isAdmin, createPizza);
router.put("/:id", verifyToken, isAdmin, updatePizza);
router.delete("/:id", verifyToken, isAdmin, deletePizza);

module.exports = router;




