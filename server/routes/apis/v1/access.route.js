"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const AccessController = require("../../../controllers/access.controller");

const { verifyToken } = require("../../../middlewares/auth.middleware");

router
  .post("/register", asyncHandler(AccessController.registerUser))

  .post("/login", asyncHandler(AccessController.loginUser))

  .use(verifyToken)
  .delete("/logout", asyncHandler(AccessController.logoutUser));

module.exports = router;
