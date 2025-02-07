"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { checkRole } = require("../../../middlewares/auth.middleware");

router
  .use(checkRole(["sys_admin"]))

  .get("/", (req, res) => {
    res.send("Admin API");
  });

module.exports = router;
