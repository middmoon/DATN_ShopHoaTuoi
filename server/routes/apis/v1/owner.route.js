"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { verifyToken, verifyOwner } = require("../../../middlewares/auth.middleware");

router
  .use(verifyToken)
  .use(verifyOwner)

  .get("/", (req, res) => {
    res.send("Owner API");
  });

module.exports = router;
