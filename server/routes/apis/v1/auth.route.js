"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const AuthController = require("../../../controllers/auth.controller");

const { verifyToken } = require("../../../middlewares/auth.middleware");

router
  .post("/register", asyncHandler(AuthController.registerUser))

  .post("/login", asyncHandler(AuthController.loginUser))

  .post("/login/system", asyncHandler(AuthController.loginSystem))

  .post("/refresh-token", asyncHandler(AuthController.refreshToken))

  .delete("/logout", verifyToken, asyncHandler(AuthController.logoutUser))

  .delete("/logout/system", verifyToken, asyncHandler(AuthController.logoutUser));

// .post("/role-verify", verifyToken, asyncHandler(AuthController.roleVerify))

// .get("/admin-verify", verifyToken, asyncHandler(AuthController.adminVerify));

module.exports = router;
