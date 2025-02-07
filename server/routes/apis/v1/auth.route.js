"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const AuthController = require("../../../controllers/auth.controller");

const { verifyToken } = require("../../../middlewares/auth.middleware");

router
  .post("/register", asyncHandler(AuthController.registerUser))

  .post("/login", asyncHandler(AuthController.loginUser))

  .post("/refresh-token", asyncHandler(AuthController.refreshToken))

  .post("/logout", verifyToken, asyncHandler(AuthController.logoutUser))

  .get("/get-role", verifyToken, asyncHandler(AuthController.getRole));

module.exports = router;
