"use strict";

const { sequelize, ProductCategory } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

class ProductCategoryCategoryService {
  static getCategory = async (id) => {
    const category = await ProductCategory.findByPk(id);
    return category;
  };

  static getCategories = async () => {
    const categories = await ProductCategory.findAll({
      attributes: ["_id", "name", "parent_id"],
    });
    return categories;
  };

  static getRootCategories = async () => {
    const categories = await ProductCategory.findAll({
      where: { parent_id: null },
    });
    return categories;
  };

  static addCategory = async (category) => {
    const newCategory = await ProductCategory.create(category);
    return newCategory;
  };

  static updateCategory = async (id, category) => {
    const updatedCategory = await ProductCategory.update(
      { ...category, updated_at: new Date() },
      {
        where: { id },
      }
    );
    return updatedCategory;
  };

  static deleteCategory = async (id) => {
    const deletedCategory = await ProductCategory.destroy({
      where: { id },
    });
    return deletedCategory;
  };
}

module.exports = ProductCategoryCategoryService;
