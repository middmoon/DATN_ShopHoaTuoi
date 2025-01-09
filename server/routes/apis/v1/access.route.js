"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const AccessController = require("../../../controllers/access.controller");

router.post("/register", asyncHandler(AccessController.registerUser));

router.post("/login", asyncHandler(AccessController.loginUser));

router.delete("/logout", asyncHandler(AccessController.logoutUser));

module.exports = router;
