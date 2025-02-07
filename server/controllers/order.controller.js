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
}

module.exports = OrderController;
