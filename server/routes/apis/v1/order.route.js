"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const OrderController = require("../../../controllers/order.controller");

router.post("/", asyncHandler(OrderController.createOrder));

module.exports = router;
