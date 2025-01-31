"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const ProductCategoryController = require("../../../controllers/product_category.controller");
router.get("/", asyncHandler(ProductCategoryController.getProductCategories));
router.get("/root", asyncHandler(ProductCategoryController.getRootCategories));

module.exports = router;
