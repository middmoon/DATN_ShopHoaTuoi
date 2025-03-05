"use strict";

const redis = require("../config/redis.config");
const { OK } = require("../utils/success.response");

const cacheMiddleware = async (req, res, next) => {
  try {
    const cacheKey = req.originalUrl;

    const cacheData = await redis.get(cacheKey);

    if (cacheData) {
      console.log("Hit cache for URL:", cacheKey);
      return new OK({
        message: "Product retrieved successfully by cache",
        data: JSON.parse(cacheData).data,
      }).send(res);
    }

    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redis.set(cacheKey, JSON.stringify(data), "EX", 3600);
      originalJson(data);
    };

    next();
  } catch (error) {
    console.error("Cache error:", error);
    next();
  }
};

module.exports = cacheMiddleware;
