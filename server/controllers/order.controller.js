"use strict";

const OrderService = require("../services/order.service");
const { OK, CREATED } = require("../utils/success.response");
const { BAD_REQUEST } = require("../utils/error.response");

class OrderController {
  static createOrder = async (req, res) => {
    new CREATED({
      message: "Order created successfully",
      data: await OrderService.createOrder(req.body),
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

  static getAllOrders = async (req, res) => {
    new OK({
      message: "get all orders successfully",
      data: await OrderService.getAllOrders(),
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
