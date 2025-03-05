"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const ProductController = require("../../../controllers/product.controller");
const { checkRole } = require("../../../middlewares/auth.middleware");

const upload = require("../../../config/multer.config");

const searchLogger = require("../../../middlewares/search-logger.middleware");
const { getResData } = require("../../../middlewares/cature-response.middleware");
const cacheMiddleware = require("../../../middlewares/cache-query.middleware");

router
  .get("/", getResData, searchLogger, cacheMiddleware, asyncHandler(ProductController.getProducts))
  //.get("/", asyncHandler(ProductController.getProducts))

  .get("/:productId(\\d+)", asyncHandler(ProductController.getProductById))

  .get("/:productSlug", asyncHandler(ProductController.getProductBySlug))

  //.use(checkRole(["sys_admin", "owner"]))
  .post("/", asyncHandler(ProductController.createProduct))

  .post("/:productId/images", upload.array("images"), asyncHandler(ProductController.addProductImage))

  // .put("/:productId/avatar", upload.single("avatar"), asyncHandler(ProductController.updateProductImage))

  .patch("/:productId", asyncHandler(ProductController.updateProduct));

module.exports = router;
