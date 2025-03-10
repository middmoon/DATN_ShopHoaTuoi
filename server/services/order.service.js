"use strict";

const { sequelize, Order, OrderProduct, Product, Payment } = require("../models");
const payment = require("../models/payment");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

const { Op } = require("sequelize");

class OrderService {
  static createOrder = async (payload) => {
    const { products, payment_method, ...order } = payload;

    if (Array.isArray(products) && products.length > 0) {
      const foundProducts = await Product.findAll({
        where: {
          _id: {
            [Op.in]: products.map((product) => product._id),
          },
        },
        attributes: ["_id"],
      });

      if (!foundProducts || foundProducts.length === 0) {
        throw new BAD_REQUEST("Can not find product");
      }

      const foundProductIds = foundProducts.map((product) => product._id);

      const diff = products.filter((product) => !foundProductIds.includes(product._id));

      if (diff.length > 0) {
        throw new BAD_REQUEST(`Can not find product: ${diff.map((product) => product._id + " - " + product.name).join(", ")}`);
      }
    }

    const total_price = products.reduce((acc, product) => acc + product.retail_price * product.quantity, 0);

    order.total_price = total_price;

    const delivery_address = order.address + " - " + order.ward_name + " - " + order.district_name + " - " + order.province_name;

    order.delivery_address = delivery_address;

    try {
      const result = await sequelize.transaction(async (t) => {
        const newOrder = await Order.create(
          {
            customer_name: order.customer_name,
            customer_phone: order.customer_phone,
            note: order.note,
            total_price: total_price,
            delivery_address: delivery_address,
            user_id: order.user_id || null,
            ward_code: order.ward_code,
            district_code: order.district_code,
            province_code: order.province_code,
          },
          { transaction: t }
        );

        if (!newOrder) {
          throw new BAD_REQUEST("Can not create order");
        }

        let newOrderProducts = [];

        if (products.length > 0) {
          newOrderProducts = await OrderProduct.bulkCreate(
            products.map((product) => {
              return {
                order_id: newOrder._id,
                product_id: product._id,
                quantity: product.quantity,
              };
            }),
            { transaction: t, returning: true }
          );

          if (!newOrderProducts || newOrderProducts.length === 0 || newOrderProducts.length != products.length) {
            throw new BAD_REQUEST("Can not create order product");
          }
        }

        let newPayment;
        if (payment_method) {
          newPayment = await Payment.create(
            {
              amount: order.total_price,
              method: payment_method,
              order_id: newOrder._id,
            },
            { transaction: t, returning: true }
          );

          if (!newPayment) {
            throw new BAD_REQUEST("Can not create payment");
          }
        }

        return { order: newOrder, products: newOrderProducts, payment: newPayment };
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  static getPendingOrdersCount = async () => {
    const count = await Order.count({
      where: {
        status: "Chờ xác nhận",
      },
    });

    return { pending_orders_count: count };
  };

  static changeOrderStatus = async (orderId, order) => {
    const updatedOrder = await Order.update(order, {
      where: { _id: orderId },
    });
    return updatedOrder;
  };

  static getAllOrders = async () => {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          through: {
            attributes: ["quantity"],
          },
          attributes: ["_id", "name", "retail_price"],
        },
      ],
    });

    if (!orders) {
      throw new NOTFOUND("Can not get orders");
    }

    return orders;
  };

  static getOrdersById = async (order_id) => {
    const orders = await Order.findAll({
      where: { _id: order_id },
      include: [
        {
          model: Product,
          through: {
            attributes: ["quantity"],
          },
          attributes: ["_id", "name", "retail_price"],
        },
      ],
    });

    if (!orders) {
      throw new NOTFOUND("Can not get orders");
    }

    return orders;
  };

  static getOrdersByStatus = async (status) => {
    const orders = await Order.findAll({
      where: { status: status },
      include: [
        {
          model: Product,
          through: {
            attributes: ["quantity"],
          },
          attributes: ["_id", "name", "retail_price"],
        },
      ],
    });

    if (!orders) {
      throw new NOTFOUND("Can not get orders");
    }

    return orders;
  };

  static updateOrder = async (orderId, order) => {
    const updatedOrder = await Order.update(order, {
      where: { _id: orderId },
    });
    return updatedOrder;
  };
}

module.exports = OrderService;
