"use strict";

const { sequelize, ProductCategory } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

class ProductCategoryCategoryService {
  static getCategories = async () => {
    const categories = await ProductCategory.findAll();
    return categories;
  };

  static getRootCategories = async () => {
    const categories = await ProductCategory.findAll({
      where: { parent_id: null },
    });
    return categories;
  };
}

module.exports = ProductCategoryCategoryService;
