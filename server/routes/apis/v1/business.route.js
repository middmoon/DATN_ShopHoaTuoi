"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const BussinesController = require("../../../controllers/business.controller");

router.get("/total-revenue", asyncHandler(BussinesController.getTotalRevenue));

module.exports = router;
