"use strict";

const { sequelize, Customer, CustomerAddress, CustomerPhone, CustomerRole, Role } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

const { Op, where } = require("sequelize");

class CustomerService {}

module.exports = CustomerService;
