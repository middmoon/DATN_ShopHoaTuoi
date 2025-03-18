"use strict";

const express = require("express");
const router = express.Router();

router.use("/vnpay", require("./vnpay.route"));

router.get("/", (req, res) => {
  res.send("TEST API V1 Payment");
});

module.exports = router;
