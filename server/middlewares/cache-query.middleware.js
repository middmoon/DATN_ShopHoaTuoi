"use strict";

const redis = require("../config/redis.config");
const { OK } = require("../utils/success.response");

// Middleware có thể tái sử dụng với prefix key
const cache = (keyPrefix = "cache") => {
  return async (req, res, next) => {
    try {
      const cacheKey = `${keyPrefix}:${req.originalUrl}`;

      const cacheData = await redis.get(cacheKey);
      if (cacheData) {
        console.log("✅ Hit cache:", cacheKey);
        return new OK({
          message: "Data retrieved successfully by cache",
          data: JSON.parse(cacheData).data,
        }).send(res);
      }

      const originalJson = res.json.bind(res);
      res.json = async (data) => {
        if (data?.status === 200 && Array.isArray(data.data) && data.data.length > 10) {
          console.log("🚀 Caching response:", cacheKey);
          await redis.set(cacheKey, JSON.stringify(data), "EX", 600); // TTL 10 phút
        }
        originalJson(data);
      };

      next();
    } catch (error) {
      console.error("❌ Cache error:", error);
      next();
    }
  };
};

const cacheProduct = cache("product:search");

module.exports = cacheProduct;
module.exports.cache = cache;
