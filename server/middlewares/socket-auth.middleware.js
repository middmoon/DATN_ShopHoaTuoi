"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const authenticateSocketToken = (token, callback) => {
  if (!token) {
    return callback(new Error("Authentication error: No token provided"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return callback(new Error("Authentication error: Invalid token"));
    }
    return callback(null, decoded);
  });
};

const authCookieMiddleware = (socket, next) => {
  const cookieHeader = socket.handshake.headers.cookie;
  if (!cookieHeader) {
    return next(new Error("No cookie provided"));
  }

  cookieParser()(socket.handshake, null, () => {
    const token = socket.handshake.cookies.token;
    authenticateSocketToken(token, (err, decoded) => {
      if (err) {
        return next(new Error(err.message));
      }
      socket.decoded = decoded;
      next();
    });
  });
};

module.exports = { authenticateSocketToken, authCookieMiddleware };
