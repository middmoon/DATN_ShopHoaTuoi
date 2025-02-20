"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const OrderController = require("../../../controllers/order.controller");

router.get("/pending", asyncHandler(OrderController.getPendingOrdersCount));
router.post("/", asyncHandler(OrderController.createOrder));

module.exports = router;
