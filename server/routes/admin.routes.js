const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updatePizza,
  deletePizza,
  getAdminStats,
  updateUserRole,
  deleteUser,
  getAllAdminPizzas,
} = require("../controllers/admin.controller");

const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

// ✅ Admin-only routes
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.put("/users/:id/role", verifyToken, isAdmin, updateUserRole); // ✅ Promote/Demote
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);        // ✅ Delete user

router.get("/stats", verifyToken, isAdmin, getAdminStats);

router.put("/pizzas/:id", verifyToken, isAdmin, updatePizza);
router.delete("/pizzas/:id", verifyToken, isAdmin, deletePizza);
router.get("/pizzas", verifyToken, isAdmin, getAllAdminPizzas);

module.exports = router;



