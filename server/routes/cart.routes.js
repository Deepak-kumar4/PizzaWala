const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const { getCart, updateCart } = require("../controllers/cart.controller");

router.get("/", verifyToken, getCart);
router.put("/", verifyToken, updateCart);

module.exports = router;








