"use strict";

const { where } = require("sequelize");
const { sequelize, Order } = require("../models");
const { BAD_REQUEST, NOTFOUND } = require("../utils/error.response");

class BussinesService {
  static getTotalRevenue = async () => {
    const totalRevenue = await Order.sum("total_price", {
      where: { status_id: 4 },
    });

    if (totalRevenue === null) {
      throw new NOTFOUND("Can not get total revenue");
    }

    return totalRevenue;
  };
}

module.exports = BussinesService;
