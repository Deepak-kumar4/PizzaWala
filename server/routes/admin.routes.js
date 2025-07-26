const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updatePizza,
  deletePizza,
  getAdminStats,
} = require("../controllers/admin.controller");

const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

// ✅ Admin-only routes
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.put("/pizzas/:id", verifyToken, isAdmin, updatePizza);
router.delete("/pizzas/:id", verifyToken, isAdmin, deletePizza);
router.get("/stats",verifyToken,isAdmin,getAdminStats)

module.exports = router;


