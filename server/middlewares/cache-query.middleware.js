"use strict";

const redis = require("../config/redis.config");
const { OK } = require("../utils/success.response");

const cacheMiddleware = async (req, res, next) => {
  try {
    const cacheKey = `product:search:${req.originalUrl}`;

    // Kiểm tra xem cache có tồn tại không
    const cacheData = await redis.get(cacheKey);
    if (cacheData) {
      console.log("✅ Hit cache:", cacheKey);
      return new OK({
        message: "Product retrieved successfully by cache",
        data: JSON.parse(cacheData).data,
      }).send(res);
    }

    // Middleware xử lý cache nếu số lượng sản phẩm > 10
    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      if (
        data.status === 200 && // Đảm bảo response hợp lệ
        Array.isArray(data.data) &&
        data.data.length > 10
      ) {
        console.log("🚀 Caching response:", cacheKey);
        await redis.set(cacheKey, JSON.stringify(data), "EX", 600); // TTL = 10 phút
      }
      originalJson(data);
    };

    next();
  } catch (error) {
    console.error("❌ Cache error:", error);
    next();
  }
};

// const redis = require("../config/redis.config");
// const { OK } = require("../utils/success.response");

// const cacheMiddleware = async (req, res, next) => {
//   try {
//     const cacheKey = req.originalUrl;

//     const cacheData = await redis.get(cacheKey);

//     if (cacheData) {
//       console.log("Hit cache for URL:", cacheKey);
//       return new OK({
//         message: "Product retrieved successfully by cache",
//         data: JSON.parse(cacheData).data,
//       }).send(res);
//     }

//     const originalJson = res.json.bind(res);
//     res.json = (data) => {
//       redis.set(cacheKey, JSON.stringify(data), "EX", 3600);
//       originalJson(data);
//     };

//     next();
//   } catch (error) {
//     console.error("Cache error:", error);
//     next();
//   }
// };

module.exports = cacheMiddleware;
