"use strict";

require("dotenv").config();

const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, FORBIDDEN } = require("../utils/error.response");

const { User, Role } = require("../models");
const { refreshAccessToken } = require("../utils/token");
const redis = require("../config/redis.config");

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

    if (!token) {
      return next(new FORBIDDEN("Invalid token"));
    }

    const isBlacklisted = await redis.get(`blacklist:${token}`);

    if (isBlacklisted) {
      return next(new FORBIDDEN("Invalid token blacklist"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(new UNAUTHORIZED("Invalid token"));
    }

    if (!decoded || !decoded.user._id) {
      return next(new FORBIDDEN("User ID is required."));
    }

    const foundUser = await User.findOne({
      where: { _id: decoded.user._id },
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

  if (!token) return next(new UNAUTHORIZED("Not found token"));

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new UNAUTHORIZED("Invalid token"));
    req._id = decoded._id;
    next();
  });
};

const flexVerifyToken = async (req, res, next) => {
  const token = req.cookies[COOKIE.AUTHORIZATION];

  if (!token) {
    req._id = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new UNAUTHORIZED("Invalid token"));
    req._id = decoded._id;
    next();
  });
};

module.exports = {
  checkRole,
  verifyToken,
  flexVerifyToken,
  COOKIE,
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
