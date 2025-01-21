"use strict";

const express = require("express");
const { route } = require("./admin.route");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/address", require("./address.route"));
router.use("/product", require("./product.route"));
router.use("/customer", require("./customer.route"));
// router.use("/admin", require("./admin.route"));
// router.use("/owner", require("./owner.route"));
module.exports = router;
