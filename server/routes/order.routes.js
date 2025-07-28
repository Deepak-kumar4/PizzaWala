const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
  getOrdersForAdmin
} = require("../controllers/order.controller");

// Create order
router.post("/create", verifyToken, createOrder);

// Get current user's orders
router.get("/my", verifyToken, getUserOrders);

// Admin get all orders
router.get("/all", verifyToken, isAdmin, getAllOrders);

// Admin update order status
router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);

// routes/order.routes.js
router.get("/admin/orders",verifyToken, isAdmin, getOrdersForAdmin);

module.exports = router;
