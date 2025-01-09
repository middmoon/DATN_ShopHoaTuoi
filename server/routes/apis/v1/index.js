"use strict";

const express = require("express");
const router = express.Router();

router.use("/access", require("./access.route"));

module.exports = router;
