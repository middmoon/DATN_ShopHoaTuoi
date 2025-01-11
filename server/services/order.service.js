"use strict";

const { sequelize, Order } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

class OrderService {
  static getOrders = async () => {
    const orders = await Order.findAll();
    return orders;
  };

  static getOrder = async (id) => {
    const order = await Order.findByPk(id);
    return order;
  };

  static getOrderByCustomer = async (customer_id) => {
    const order = await Order.findOne({
      where: { customer_id },
    });
    return order;
  };

  static createOrder = async (order) => {
    const newOrder = await Order.create(order);
    return newOrder;
  };

  static updateOrder = async (id, order) => {
    const updatedOrder = await Order.update(order, {
      where: { id },
    });
    return updatedOrder;
  };

  static deleteOrder = async (id) => {
    const deletedOrder = await Order.destroy({ where: { id } });
    return deletedOrder;
  };
}

module.exports = OrderService;
