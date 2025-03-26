"use strict";

const BussinesService = require("../services/business.service");
const { OK } = require("../utils/success.response");

class BussinesController {
  static getTotalRevenue = async (req, res) => {
    new OK({
      message: "get bussines successfully",
      data: await BussinesService.getTotalRevenue(),
    }).send(res);
  };
}

module.exports = BussinesController;
