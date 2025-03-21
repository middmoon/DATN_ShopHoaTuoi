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

  static getPendingOrders = async (req, res) => {
    new OK({
      message: "get pending orders successfully",
      data: await OrderService.getOrdersByStatus("Chờ xác nhận"),
    }).send(res);
  };

  static getFinishedOrders = async (req, res) => {
    new OK({
      message: "get finished orders successfully",
      data: await OrderService.getOrdersByStatus("Hoàn thành"),
    }).send(res);
  };

  static getComfirmedOrders = async (req, res) => {
    new OK({
      message: "get comfirmed orders successfully",
      data: await OrderService.getOrdersByStatus("Đang xử lý"),
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
