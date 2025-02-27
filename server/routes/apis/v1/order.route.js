"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const OrderController = require("../../../controllers/order.controller");

router
  // Tạo đơn hàng
  .post("/", asyncHandler(OrderController.createOrder))

  // Lấy số lượng đơn hàng đang chờ xử lý
  .get("/pending-orders-count", asyncHandler(OrderController.getPendingOrdersCount))

  // Lấy danh sách đơn hàng theo trạng thái
  .get("/pending", asyncHandler(OrderController.getPendingOrders))
  .get("/comfirmed", asyncHandler(OrderController.getComfirmedOrders))
  .get("/finished", asyncHandler(OrderController.getFinishedOrders))

  // Lấy danh sách tất cả đơn hàng
  .get("/", asyncHandler(OrderController.getAllOrders))

  // Lấy đơn hàng theo ID
  .get("/:_id(\\d+)", asyncHandler(OrderController.getOrdersById))

  // Cập nhật trạng thái đơn hàng
  .patch("/:_id/status", asyncHandler(OrderController.changeOrderStatus));

module.exports = router;
