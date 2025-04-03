"use strict";

const { sequelize, Order, OrderProduct, Product, Payment, PaymentHistory, OrderStatus, PaymentMethod } = require("../models");
const payment = require("../models/payment");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");
const moment = require("moment");

const { Op, where } = require("sequelize");

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
            status_id: order.status_id ? order.status_id : 1,
            ward_code: order.ward_code,
            district_code: order.district_code,
            province_code: order.province_code,
            delivery_day: order.delivery_day ? new Date(order.delivery_day) : null,
            type: order.type ? order.type : "Đơn online",
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

        if (payment_method_id) {
          const { payment, paymentHistory } = this.initOrderInfo(payment_method_id, newOrder._id, order.total_price);

          newPayment = await Payment.create(payment, { transaction: t });

          if (!newPayment) {
            throw new BAD_REQUEST("Can not create payment, do not have payment method");
          }

          const newPaymentHistory = await PaymentHistory.create(
            {
              payment_id: newPayment._id,
              order_id: newOrder._id,
              status: paymentHistory.status,
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
    let payment = {};
    let paymentHistory = {};

    switch (payment_method_id) {
      case 1: // { _id: 1, name: "VNPay" },
        const vnp_TxnRef = orderId + "_" + moment().format("YYYYMMDDHHmmss");
        payment = {
          amount: total_price,
          method_id: payment_method_id,
          order_id: orderId,
          status: "Chờ xác nhận",
          info: {
            vnp_TxnRef: vnp_TxnRef,
            vnp_OrderInfo: `Thanh toan cho don hang: ${vnp_TxnRef}`,
            language: "vn",
          },
        };

        paymentHistory = {
          status: "Chờ xác nhận",
        };
        break;
      case 4: // { _id: 4, name: "Tiền mặt" },
        payment = {
          amount: total_price,
          method_id: payment_method_id,
          order_id: orderId,
          status: "Hoàn thành",
          info: {
            shop_order: `Thanh toán cho đơn hàng tại shop: ${orderId}`,
          },
        };

        paymentHistory = {
          status: "Hoàn thành",
        };
        break;
      case 7: // { _id: 7, name: "Thanh toán khi nhận hàng (COD)" },
        payment = {
          amount: total_price,
          method_id: payment_method_id,
          order_id: orderId,
          status: "Chờ xác nhận",
          info: {
            cod_order: `Thanh toán cho đơn hàng COD: ${orderId}`,
          },
        };

        paymentHistory = {
          status: "Chờ xác nhận",
        };
        break;
      case 2:
        break;
      case 3:
        break;
      case 5:
        break;
      case 6:
        break;
      default:
        break;
    }

    return { payment, paymentHistory };
  };

  static changeOrderStatus = async (orderId, order) => {
    const t = await sequelize.transaction();

    try {
      const updatedOrder = await Order.update({ status_id: order.status_id }, { where: { _id: orderId }, transaction: t });

      let updatedPayment = null;

      switch (order.status_id) {
        case 2:
          break;
        case 4:
          const paymentData = {
            paymentStatus: "Hoàn thành",
          };
          updatedPayment = await this.updateOrderInfo(orderId, paymentData, t);
          break;
      }

      await t.commit();
      return { updatedOrder, updatedPayment };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  static updateOrderInfo = async (orderId, { paymentStatus, paymentInfo = {} }, transaction) => {
    try {
      // Tìm Payment dựa trên orderId
      const payment = await Payment.findOne({
        where: { order_id: orderId },
        transaction,
      });

      if (!payment) {
        throw new BAD_REQUEST(`Payment not found for order ${orderId}`);
      }

      await payment.update(
        {
          status: paymentStatus,
          info: {
            ...paymentInfo,
          },
        },
        { transaction }
      );

      await PaymentHistory.create(
        {
          payment_id: payment._id,
          order_id: orderId,
          status: paymentStatus,
        },
        { transaction }
      );

      return payment;
    } catch (error) {
      throw error;
    }
  };

  static getPendingOrdersCount = async () => {
    const pendingOrdersCount = await Order.count({
      where: {
        status_id: 1,
      },
    });

    return { pendingOrdersCount };
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
        {
          model: OrderStatus,
          attributes: ["name"],
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
            {
              model: PaymentHistory,
              attributes: ["status", "createdAt"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
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

  static getOrdersByStatus = async (statusId) => {
    const orders = await Order.findAll({
      where: { status_id: statusId },
      include: [
        {
          model: Product,
          through: {
            attributes: ["quantity"],
          },
          attributes: ["_id", "name", "retail_price"],
        },
        {
          model: OrderStatus,
          attributes: ["name"],
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
            {
              model: PaymentHistory,
              attributes: ["status", "createdAt"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
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

  static countOrders = async () => {
    const count = await Order.count();

    if (!count) {
      throw new NOTFOUND("Can not get orders");
    }

    return count;
  };
}

module.exports = OrderService;
