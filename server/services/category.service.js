"use strict";

const { sequelize, ProductCategory } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

class CategoryService {
  static getCategories = async () => {
    const categories = await ProductCategory.findAll();
    return categories;
  };

  static getCategory = async (id) => {
    const category = await ProductCategory.findByPk(id);
    return category;
  };

  static createCategory = async (category) => {
    const newCategory = await ProductCategory.create(category);
    return newCategory;
  };

  static updateCategory = async (id, category) => {
    const updatedCategory = await ProductCategory.update(category, {
      where: { id },
    });
    return updatedCategory;
  };

  static deleteCategory = async (id) => {
    const deletedCategory = await ProductCategory.destroy({ where: { id } });
    return deletedCategory;
  };
}

module.exports = CategoryService;
