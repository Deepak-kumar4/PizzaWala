const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

router.post("/", verifyToken, createOrder);
router.get("/my", verifyToken, getUserOrders);
router.put("/:id/status", verifyToken, updateOrderStatus);

module.exports = router;





