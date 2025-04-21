"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const ProductController = require("../../../controllers/product.controller");
const { checkRole } = require("../../../middlewares/auth.middleware");

const upload = require("../../../config/multer.config");

const searchLogger = require("../../../middlewares/search-logger.middleware");
const { getResData } = require("../../../middlewares/cature-response.middleware");
const cacheProduct = require("../../../middlewares/cache-query.middleware");

router
  //getResData, searchLogger, cacheProduct,
  .get("/", asyncHandler(ProductController.getProducts))

  .get("/manage", checkRole(["owner"]), asyncHandler(ProductController.getProducts))

  .get("/manage/basic", checkRole(["owner"]), asyncHandler(ProductController.getProductsBasic))

  .get("/for-shop-order", checkRole(["owner"]), asyncHandler(ProductController.getProductsForShopOrder))

  .get("/:productId(\\d+)", asyncHandler(ProductController.getProductById))

  .get("/:productSlug", asyncHandler(ProductController.getProductBySlug))

  .post("/", asyncHandler(ProductController.createProduct))

  .post("/:productId/images", upload.array("images"), asyncHandler(ProductController.addProductImage))

  .patch("/:productId", upload.any("images"), asyncHandler(ProductController.updateProduct));

module.exports = router;
