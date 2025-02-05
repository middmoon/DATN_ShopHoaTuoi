"use strict";

const { OK } = require("../utils/success.response");
const AddressService = require("../services/address.service");

class AddressController {
  static getProvinces = async (req, res, next) => {
    new OK({
      message: "get provinces OK",
      data: await AddressService.getProvinces(),
    }).send(res);
  };

  static getDistrictsByProvinceCode = async (req, res, next) => {
    new OK({
      message: "get districts OK",
      data: await AddressService.getDistrictsByProvinceCode(req.params.province_code),
    }).send(res);
  };

  static getWardsByDistrictCode = async (req, res, next) => {
    new OK({
      message: "get wards OK",
      data: await AddressService.getWardsByDistrictCode(req.params.district_code),
    }).send(res);
  };

  static searchPlace = async (req, res, next) => {
    new OK({
      message: "Seach place OK",
      data: await AddressService.searchPlace(req.query),
    }).send(res);
  };
}

module.exports = AddressController;
