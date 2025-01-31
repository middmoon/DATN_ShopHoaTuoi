"use strict";

const { OK, CREATED } = require("../utils/success.response");
const { BAD_REQUEST } = require("../utils/error.response");
const ProductCategoryCategoryService = require("../services/product_category.service");

class ProductCategoryController {
  static getProductCategories = async (req, res) => {
    new OK({
      message: "Product categories retrieved successfully",
      data: await ProductCategoryCategoryService.getCategories(),
    }).send(res);
  };

  static getRootCategories = async (req, res) => {
    new OK({
      message: "Root categories retrieved successfully",
      data: await ProductCategoryCategoryService.getRootCategories(),
    }).send(res);
  };
}

module.exports = ProductCategoryController;
