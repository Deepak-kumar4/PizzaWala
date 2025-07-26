const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const { getMenu } = require("../controllers/menu.controller");

router.get("/", verifyToken, getMenu);

module.exports = router;

