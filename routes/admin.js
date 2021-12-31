const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");
const product = require("../controller/product");
const user = require("../controller/user");
const cart = require("../controller/cart");

router.post("/login", admin.adminLogin);
router.post("/add", admin.addAdminAccount);
module.exports = router;
