"use strict";

const { sequelize, Product } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

const cloudinary = require("../config/cloudiary.config");

class ProductService {
  static getProducts = async () => {
    const products = await Product.findAll();
    return products;
  };

  static getProductById = async (id) => {
    const product = await Product.findByPk(id);
    return product;
  };

  static getProductsByName = async (name) => {
    const product = await Product.findOne({
      where: { name },
    });
    return product;
  };

  static getProductsByCategory = async (category) => {
    const product = await Product.findOne({
      where: { category },
    });
    return product;
  };

  static getProductsByAttribute = async (id, attributes) => {};

  static getOutOfStockProducts = async (id) => {};

  static createProduct = async (product) => {
    const newProduct = await Product.create(product);
    return newProduct;
  };

  static updateProduct = async (id, product) => {
    const updatedProduct = await Product.update(product, {
      where: { id },
    });
    return updatedProduct;
  };

  static deleteProduct = async (id) => {
    const deletedProduct = await Product.destroy({ where: { id } });
    return deletedProduct;
  };

  static addProductImage = async (id, image) => {};

  static updateProductImage = async (id, image) => {};

  static deleteProductImage = async (id, image) => {};

  static updateProductStock = async (id, quantity) => {};
}

module.exports = ProductService;
