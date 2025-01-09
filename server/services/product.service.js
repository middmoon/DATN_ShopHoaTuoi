"use strict";

const { sequelize, Product } = require("../models");

class ProductService {
  static getProducts = async () => {
    const products = await Product.findAll();
    return products;
  };

  static getProduct = async (id) => {
    const product = await Product.findByPk(id);
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
}

module.exports = ProductService;
