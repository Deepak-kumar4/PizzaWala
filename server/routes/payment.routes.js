const express = require("express");
const router = express.Router();
const { createRazorpayOrder, verifyPayment } = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/create-order", verifyToken, createRazorpayOrder);
router.post("/verify", verifyToken, verifyPayment);

module.exports = router;


