"use strict";

const OrderService = require("../services/order.service");
const { OK, CREATED } = require("../utils/success.response");
const { BAD_REQUEST } = require("../utils/error.response");

class OrderController {
  static createOrder = async (req, res) => {
    new CREATED({
      message: "Order created successfully",
      data: await OrderService.createOrder(req.body, req._id),
    }).send(res);
  };

  static getPendingOrdersCount = async (req, res) => {
    new OK({
      message: "get pending order successfully",
      data: await OrderService.getPendingOrdersCount(),
    }).send(res);
  };

  static confirmOrder = async (req, res) => {
    new OK({
      message: "Order confirmed successfully",
      data: await OrderService.confirmOrder(req.body),
    }).send(res);
  };

  static changeOrderStatus = async (req, res) => {
    new OK({
      message: "Order status changed successfully",
      data: await OrderService.changeOrderStatus(req.params._id, req.body),
    }).send(res);
  };

  static getAllOrders = async (req, res) => {
    new OK({
      message: "get all orders successfully",
      data: await OrderService.getAllOrders(),
    }).send(res);
  };

  // await queryInterface.bulkInsert("order_statuses", [
  //   { _id: 1, name: "Chờ xác nhận", description: "Đơn hàng đang chờ xác nhận" },
  //   { _id: 2, name: "Đang xử lý", description: "Đơn hàng đang được chuẩn bị" },
  //   { _id: 3, name: "Đang giao hàng", description: "Shipper đang giao đơn hàng" },
  //   { _id: 4, name: "Hoàn thành", description: "Đơn hàng đã được giao thành công" },
  //   { _id: 5, name: "Đơn bị hủy", description: "Đơn hàng đã bị hủy" },
  //   { _id: 6, name: "Đơn bị hoàn", description: "Khách hàng trả lại hàng" },
  // ]);

  static getPendingOrders = async (req, res) => {
    new OK({
      message: "get pending orders successfully",
      data: await OrderService.getOrdersByStatus(1),
    }).send(res);
  };

  static getComfirmedOrders = async (req, res) => {
    new OK({
      message: "get comfirmed orders successfully",
      data: await OrderService.getOrdersByStatus(2),
    }).send(res);
  };

  static getFinishedOrders = async (req, res) => {
    new OK({
      message: "get finished orders successfully",
      data: await OrderService.getOrdersByStatus(4),
    }).send(res);
  };

  static getOrdersById = async (req, res) => {
    new OK({
      message: "get orders by id successfully",
      data: await OrderService.getOrdersById(req.params._id),
    }).send(res);
  };
}

module.exports = OrderController;
