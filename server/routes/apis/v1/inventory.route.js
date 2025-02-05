"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.get("/", (req, res) => {
  res.send("Inventory API");
});

router.get("/", (req, res) => {
  res.send("Inventory API");
});

module.exports = router;
