"use strict";

const { sequelize, Order, OrderProduct, Product, Payment, PaymentHistory } = require("../models");
const payment = require("../models/payment");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");
const moment = require("moment");

const { Op } = require("sequelize");

class OrderService {
  static createOrder = async (payload, customer_id = null) => {
    const { products, payment_method_id, ...order } = payload;

    const product_ids = products.map((product) => product._id);

    if (Array.isArray(products) && products.length > 0) {
      const foundProducts = await Product.findAll({
        where: {
          _id: {
            [Op.in]: product_ids,
          },
        },
        attributes: ["_id"],
      });

      if (foundProducts.length !== products.length) {
        const foundProductIds = foundProducts.map((p) => p._id);
        const diff = products.filter((product) => !foundProductIds.includes(product._id));
        if (diff.length > 0) {
          throw new BAD_REQUEST(`Can not find products: ${diff.map((p) => p._id).join(", ")}`);
        }
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
            customer_id: customer_id,
            customer_name: order.customer_name,
            customer_phone: order.customer_phone,
            note: order.note,
            total_price: total_price,
            delivery_address: delivery_address,
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
            { transaction: t }
          );

          if (!newOrderProducts || newOrderProducts.length === 0 || newOrderProducts.length != products.length) {
            throw new BAD_REQUEST("Can not create order product");
          }
        }

        let newPayment;

        const info = this.initOrderInfo(payment_method_id, newOrder._id, order.total_price);
        info.vnp_OrderInfo = `Thanh toan cho don hang: ${info.vnp_TxnRef}`;

        if (payment_method_id) {
          newPayment = await Payment.create(
            {
              amount: order.total_price,
              method_id: payment_method_id,
              order_id: newOrder._id,
              status: "Chờ xác nhận",
              info: info,
            },
            { transaction: t }
          );

          if (!newPayment) {
            throw new BAD_REQUEST("Can not create payment, do not have payment method");
          }

          const newPaymentHistory = await PaymentHistory.create(
            {
              payment_id: newPayment._id,
              order_id: newOrder._id,
              status: "Chờ xác nhận",
            },
            { transaction: t }
          );

          if (!newPaymentHistory) {
            throw new BAD_REQUEST("Can not create payment history");
          }
        }

        return { order: newOrder, products: newOrderProducts, payment: newPayment };
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  static initOrderInfo = (payment_method_id, orderId, total_price) => {
    // { _id: 2, name: "Momo" },
    // { _id: 3, name: "ZaloPay" },
    // { _id: 5, name: "Thẻ tín dụng" },
    // { _id: 6, name: "Chuyển khoản ngân hàng" },

    switch (payment_method_id) {
      case 1: // { _id: 1, name: "VNPay" },
        return {
          vnp_TxnRef: orderId + "_" + moment().format("YYYYMMDDHHmmss"),
          // vnp_OrderInfo: `Thanh toan cho don hang: ${newOrder._id}`,
          language: "vn",
        };
      case 4: // { _id: 4, name: "Tiền mặt" },
        return {};
      case 7: // { _id: 7, name: "Thanh toán khi nhận hàng (COD)" },
        return {};
      case 2:
        return {};
      case 3:
        return {};
      case 5:
        return {};
      case 6:
        return {};
      default:
        return {};
    }
  };

  static updateOrderInfo = async (orderId, { paymentStatus, paymentInfo = {} }) => {
    const t = await sequelize.transaction();

    try {
      // Tìm Payment dựa trên orderId
      const payment = await Payment.findOne({
        where: { order_id: orderId },
        transaction: t,
      });

      if (!payment) {
        throw new BAD_REQUEST(`Payment not found for order ${orderId}`);
      }

      await payment.update(
        {
          status: paymentStatus,
          info: {
            ...payment.info,
            ...paymentInfo,
          },
        },
        { transaction: t }
      );

      // Tạo PaymentHistory
      await PaymentHistory.create(
        {
          payment_id: payment._id,
          order_id: orderId,
          status: paymentStatus,
        },
        { transaction: t }
      );

      await t.commit();
      return payment; // Trả về Payment đã cập nhật
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  static getPendingOrdersCount = async () => {
    const count = await Order.count({
      where: {
        status_id: 1,
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
