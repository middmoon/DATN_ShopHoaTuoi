"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const ProductController = require("../../../controllers/product.controller");
const { checkRole } = require("../../../middlewares/auth.middleware");

const upload = require("../../../config/multer.config");

router
  .get("/", asyncHandler(ProductController.getProducts))

  .get("/:productId", asyncHandler(ProductController.getProductById))

  //.use(checkRole(["sys_admin", "owner"]))
  .post("/", asyncHandler(ProductController.createProduct))

  .post("/:productId/images", upload.array("images"), asyncHandler(ProductController.addProductImage))

  // .put("/:productId/avatar", upload.single("avatar"), asyncHandler(ProductController.updateProductImage))

  .patch("/:productId", asyncHandler(ProductController.updateProduct));

module.exports = router;
