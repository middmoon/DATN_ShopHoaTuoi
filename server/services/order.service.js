"use strict";

const { sequelize, Order, OrderProduct, Product } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

const { Op } = require("sequelize");

class OrderService {
  static createOrder = async (payload) => {
    const { products, ...order } = payload;

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

        return { order: newOrder, orderProducts: newOrderProducts };
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

    if (!count) {
      throw new BAD_REQUEST("Can not get pending orders");
    }

    return { pending_orders_count: count };
  };

  static confirmOrder = async (payload) => {
    const updatedOrder = await Order.update(
      {
        status: "Đã xác nhận",
      },
      {
        where: { id: payload.id },
      }
    );

    if (!updatedOrder) {
      throw new BAD_REQUEST("Can not confirm order");
    }

    return updatedOrder;
  };

  // static getOrders = async () => {
  //   const orders = await Order.findAll({
  //     include: [OrderProduct],
  //   });
  //   return orders;
  // };

  // static getOrder = async (id) => {
  //   const order = await Order.findByPk(id, {
  //     include: [OrderProduct],
  //   });
  //   return order;
  // };

  // static getOrderByCustomer = async (customer_id) => {
  //   const order = await Order.findOne({
  //     where: { customer_id },
  //     include: [OrderProduct],
  //   });
  //   return order;
  // };

  // static updateOrder = async (id, order) => {
  //   const updatedOrder = await Order.update(order, {
  //     where: { id },
  //   });
  //   return updatedOrder;
  // };

  // static deleteOrder = async (id) => {
  //   const deletedOrder = await Order.destroy({ where: { id } });
  //   return deletedOrder;
  // };
}

module.exports = OrderService;
