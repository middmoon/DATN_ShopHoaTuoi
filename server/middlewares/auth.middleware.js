"use strict";

require("dotenv").config();

const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, FORBIDDEN } = require("../utils/error.response");

const { User, Role } = require("../models");
const { refreshAccessToken } = require("../utils/token");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

const COOKIE = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "accessToken",
  REFRESHTOKEN: "refreshToken",
};

const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    const token = req.cookies[COOKIE.AUTHORIZATION];

    if (!token) throw new UNAUTHORIZED("Not found token");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw new UNAUTHORIZED("Invalid token");
      req._id = decoded._id;
    });

    const userId = req._id;

    if (!userId) {
      throw new FORBIDDEN("User ID is required.");
    }

    const foundUser = await User.findOne({
      where: { _id: userId },
      include: {
        model: Role,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      attributes: ["_id"],
    });

    if (!foundUser || !foundUser.Roles) {
      return next(new UNAUTHORIZED("Insufficient privileges"));
    }

    const userRoles = foundUser.Roles.map((role) => role.name);
    const hasRole = allowedRoles.some((role) => userRoles.includes(role));

    if (hasRole) {
      return next();
    } else {
      return next(new UNAUTHORIZED("Insufficient privileges"));
    }
  };
};

const verifyToken = async (req, res, next) => {
  const token = req.cookies[COOKIE.AUTHORIZATION];

  if (!token) throw new UNAUTHORIZED("Not found token");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw new UNAUTHORIZED("Invalid token");
    req._id = decoded._id;
    next();
  });
};

module.exports = {
  checkRole,
  verifyToken,
};

//
// const checkRole = async (req, res, next, roleName) => {
//   const token = req.cookies[COOKIE.AUTHORIZATION];

//   if (!token) throw new UNAUTHORIZED("Not found token");

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) throw new UNAUTHORIZED("Invalid token");
//     req._id = decoded._id;
//   });

//   const userId = req._id;

//   if (!userId) {
//     throw new FORBIDDEN("User ID is required.");
//   }

//   const foundUser = await User.findOne({
//     where: { _id: userId },
//     include: {
//       model: Role,
//       where: { name: roleName },
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//     attributes: ["_id"],
//   });

//   if (foundUser && foundUser.Roles) {
//     next();
//   } else {
//     return next(new UNAUTHORIZED("Insufficient privileges"));
//   }
// };

// const verifyAdmin = (req, res, next) => {
//   return checkRole(req, res, next, "sys_admin");
// };

// const verifyOwner = (req, res, next) => {
//   return checkRole(req, res, next, "owner");
// };

// const verifyEmployee = (req, res, next) => {
//   return checkRole(req, res, next, "employee");
// };

// const verifyCustomer = (req, res, next) => {
//   return checkRole(req, res, next, "customer");
// };
