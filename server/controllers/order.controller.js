"use strict";

const OrderService = require("../services/order.service");
const { OK, CREATED } = require("../utils/success.response");

class OrderController {
  static createOrder = async (req, res) => {
    const io = req.app.get("io");

    console.log(req.body);

    const newOrder = await OrderService.createOrder(req.body, req._id || null);
    const pendingOrdersCount = await OrderService.getPendingOrdersCount();
    io.emit("orderCount", pendingOrdersCount);

    new CREATED({
      message: "Order created successfully",
      // data: "newOrder",
      data: newOrder,
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
    const io = req.app.get("io");

    const updatedOrder = await OrderService.changeOrderStatus(req.params._id, req.body);
    const pendingOrdersCount = await OrderService.getPendingOrdersCount();
    io.emit("orderCount", pendingOrdersCount);

    new OK({
      message: "Order status changed successfully",
      data: updatedOrder,
    }).send(res);

    // console.log(req.body);
    // console.log(req.params._id);

    // new OK({
    //   message: "Order status changed successfully",
    //   data: req.body,
    // }).send(res);
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
      data: await OrderService.getOrdersByStatus(1),
    }).send(res);
  };

  static getComfirmedOrders = async (req, res) => {
    new OK({
      message: "get comfirmed orders successfully",
      data: await OrderService.getOrdersByStatus(2),
    }).send(res);
  };

  static getShippingOrders = async (req, res) => {
    new OK({
      message: "get comfirmed orders successfully",
      data: await OrderService.getOrdersByStatus(3),
    }).send(res);
  };

  static getFinishedOrders = async (req, res) => {
    new OK({
      message: "get finished orders successfully",
      data: await OrderService.getOrdersByStatus(4),
    }).send(res);
  };

  static getCanceledOrders = async (req, res) => {
    new OK({
      message: "get comfirmed orders successfully",
      data: await OrderService.getOrdersByStatus(5),
    }).send(res);
  };

  static getRefundOrders = async (req, res) => {
    new OK({
      message: "get comfirmed orders successfully",
      data: await OrderService.getOrdersByStatus(6),
    }).send(res);
  };

  static getOrdersById = async (req, res) => {
    new OK({
      message: "get orders by id successfully",
      data: await OrderService.getOrdersById(req.params._id),
    }).send(res);
  };

  static countOrders = async (req, res) => {
    new OK({
      message: "get orders count successfully",
      data: await OrderService.countOrders(),
    }).send(res);
  };
}

module.exports = OrderController;
