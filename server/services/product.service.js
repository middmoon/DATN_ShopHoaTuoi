"use strict";

const { sequelize, Product } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

class ProductService {
  static getProducts = async () => {
    const products = await Product.findAll();
    return products;
  };

  static getProduct = async (id) => {
    const product = await Product.findByPk(id);
    return product;
  };

  static getProductByName = async (name) => {
    const product = await Product.findOne({
      where: { name },
    });
    return product;
  };

  static getProductByCategory = async (category) => {
    const product = await Product.findOne({
      where: { category },
    });
    return product;
  };

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
}

module.exports = ProductService;
