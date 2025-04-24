"use strict";

const { sequelize, CustomerAddress, Order, Product, Payment, PaymentHistory, PaymentMethod, Review } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

const { Op, where } = require("sequelize");

class CustomerService {
  static async getMyAllOrders(customerId) {
    console.log("customerId");

    console.log(customerId);
    const foundOrders = await Order.findAll({
      where: {
        customer_id: customerId,
      },
      include: [
        {
          model: Product,
          attributes: ["_id", "name", "retail_price"],
          through: {
            attributes: ["quantity"],
          },
        },
        {
          model: Payment,
          as: "payment",
          attributes: ["_id", "amount", "status", "info"],
          include: [
            {
              model: PaymentMethod,
              attributes: ["name"],
            },
          ],
          include: [
            {
              model: PaymentHistory,
              attributes: ["status", "createdAt"],
            },
          ],
        },
      ],
    });

    if (!foundOrders) {
      throw new NOTFOUND("Can not get orders");
    }

    return foundOrders;
  }

  static async getMyOrderDetailsById(customerId, orderId) {
    const foundOrder = await Order.findOne({
      where: {
        _id: orderId,
        customer_id: customerId,
      },
      include: [
        {
          model: Product,
          attributes: ["_id", "name", "retail_price"],
          through: {
            attributes: ["quantity"],
          },
        },
        {
          model: Payment,
          attributes: ["_id", "amount", "status", "info"],
          include: [
            {
              model: PaymentMethod,
              attributes: ["name"],
            },
          ],
          include: [
            {
              model: PaymentHistory,
              attributes: ["status", "createdAt"],
            },
          ],
        },
      ],
    });

    if (!foundOrder) {
      throw new NOTFOUND("Can not get order");
    }

    return foundOrder;
  }

  static async reviewOrder(customerId, orderId, payload) {
    const foundOrder = await Order.findOne({
      where: {
        _id: orderId,
        customer_id: customerId,
      },
      include: [
        {
          model: Product,
          attributes: ["_id", "name", "retail_price"],
          through: {
            attributes: ["quantity"],
          },
        },
        {
          model: Payment,
          attributes: ["_id", "amount", "status", "info"],
          include: [
            {
              model: PaymentMethod,
              attributes: ["name"],
            },
          ],
          include: [
            {
              model: PaymentHistory,
              attributes: ["status", "createdAt"],
            },
          ],
        },
      ],
    });

    if (!foundOrder) {
      throw new NOTFOUND("Can not get order");
    }

    if (foundOrder.status_id !== 4) {
      throw new BAD_REQUEST("You can not review this order");
    }

    const { comment } = payload;

    const review = await Review.create({
      comment,
      order_id: orderId,
      product_id: foundOrder.products[0]._id,
      customer_id: customerId,
    });
  }
}

module.exports = CustomerService;
