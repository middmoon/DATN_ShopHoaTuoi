"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const OrderController = require("../../../controllers/order.controller");

router
  .get("/pending", asyncHandler(OrderController.getPendingOrdersCount))
  .post("/", asyncHandler(OrderController.createOrder))
  .get("/:_id", asyncHandler(OrderController.getOrdersById))

  .get("/", asyncHandler(OrderController.getAllOrders));

module.exports = router;
