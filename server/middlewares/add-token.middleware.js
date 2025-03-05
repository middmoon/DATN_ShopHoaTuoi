"use strict";
require("dotenv").config();

const redis = require("../config/redis.config");
const jwt = require("jsonwebtoken");
const { COOKIE } = require("./auth.middleware");

const addBlacklistToken = async (req, res, next) => {
  const token = req.cookies[COOKIE.AUTHORIZATION];

  if (!token) return next(new Error("Not found token"));

  res.on("finish", async () => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ttl = decoded.exp - Math.floor(Date.now() / 1000);
    if (ttl > 0) {
      await redis.set(`blacklist:${token}`, "true", "EX", ttl);
    }
  });

  next();
};

module.exports = { addBlacklistToken };
