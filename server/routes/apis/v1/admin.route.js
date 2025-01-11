"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { verifyToken, verifyAdmin } = require("../../../middlewares/auth.middleware");

router
  .use(verifyToken)
  .use(verifyAdmin)

  .get("/", (req, res) => {
    res.send("Admin API");
  });

module.exports = router;
