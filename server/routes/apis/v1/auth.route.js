"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const AuthController = require("../../../controllers/auth.controller");

const { verifyToken } = require("../../../middlewares/auth.middleware");

router
  .post("/register", asyncHandler(AuthController.registerUser))

  .post("/login", asyncHandler(AuthController.loginUser))

  .use(verifyToken)
  // .post("/refresh", asyncHandler(AuthController.refreshToken))

  .delete("/logout", asyncHandler(AuthController.logoutUser));

module.exports = router;
