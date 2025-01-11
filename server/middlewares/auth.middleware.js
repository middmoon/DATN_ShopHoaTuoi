"use strict";

require("dotenv").config();

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { UNAUTHORIZED, FORBIDDEN } = require("../utils/error.response");

const { User, Role } = require("../models");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

const verifyToken = async (req, res, next) => {
  const token = req.headers[HEADER.AUTHORIZATION];

  if (!token) throw new UNAUTHORIZED("Not found token");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw new UNAUTHORIZED("Invalid token");
    req._id = decoded._id;
    next();
  });
};

const checkRole = async (req, res, next, roleName) => {
  const userId = req._id;

  if (!userId) {
    throw new FORBIDDEN("User ID is required.");
  }

  const foundUser = await User.findOne({
    where: { _id: userId },
    include: {
      model: Role,
      where: { name: roleName },
      attributes: ["name"],
    },
    attributes: ["_id"],
  });

  if (foundUser && foundUser.Roles) {
    next();
  } else {
    return next(new UNAUTHORIZED("Insufficient privileges"));
  }
};

const verifyAdmin = (req, res, next) => {
  return checkRole(req, res, next, "sys_admin");
};

const verifyOwner = (req, res, next) => {
  return checkRole(req, res, next, "owner");
};

const verifyEmployee = (req, res, next) => {
  return checkRole(req, res, next, "employee");
};

const verifyCustomer = (req, res, next) => {
  return checkRole(req, res, next, "customer");
};

module.exports = {
  verifyToken,
  verifyCustomer,
  verifyAdmin,
  verifyOwner,
  verifyEmployee,
};
