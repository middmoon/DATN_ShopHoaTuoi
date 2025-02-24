"use strict";

const CustomerService = require("../services/customer.service");
const { OK, CREATED } = require("../utils/success.response");
const { BAD_REQUEST } = require("../utils/error.response");

class CustomerController {
  static createCustomer = async (req, res) => {
    new CREATED({
      message: "Customer created successfully",
      data: await CustomerService.createCustomer(req.body),
    }).send(res);
  };

  static getCustomers = async (req, res) => {
    new OK({
      message: "get customers successfully",
      data: await CustomerService.getCustomers(),
    }).send(res);
  };

  static getCustomerById = async (req, res) => {
    new OK({
      message: "get customer by id successfully",
      data: await CustomerService.getCustomerById(req.params._id),
    }).send(res);
  };

  static updateCustomer = async (req, res) => {
    new OK({
      message: "update customer successfully",
      data: await CustomerService.updateCustomer(req.params._id, req.body),
    }).send(res);
  };

  static deleteCustomer = async (req, res) => {
    new OK({
      message: "delete customer successfully",
      data: await CustomerService.deleteCustomer(req.params._id),
    }).send(res);
  };
}

module.exports = CustomerController;
