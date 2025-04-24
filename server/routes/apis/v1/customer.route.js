"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { checkRole } = require("../../../middlewares/auth.middleware");
const CustomerController = require("../../../controllers/customer.controller");

router
  .get("/my-orders", checkRole(["customer"]), asyncHandler(CustomerController.getMyOrders))
  .get("/review-order/:orderId", checkRole(["customer"]), asyncHandler(CustomerController.reviewOrder));

module.exports = router;
