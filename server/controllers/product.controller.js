"use strict";

const { OK, CREATED } = require("../utils/success.response");
const { BAD_REQUEST } = require("../utils/error.response");

const ProductService = require("../services/product.service");

const { Product } = require("../models");

class ProductController {
  static createProduct = async (req, res) => {
    new CREATED({
      message: "Product created successfully",
      data: await ProductService.createProduct(req.body),
    }).send(res);
  };

  static deleteProduct = async (req, res) => {
    const product = await ProductService.updateProduct(req.params.productId);
    new OK({
      message: "Product deleted successfully",
      data: product,
    }).send(res);
  };

  static updateProduct = async (req, res) => {
    const product = await ProductService.updateProduct(req.params.productId, req.body);
    new OK({
      message: "Product updated successfully",
      data: product,
    }).send(res);
  };

  static getProducts = async (req, res) => {
    const products = await ProductService.getProducts();
    new OK({
      message: "Products retrieved successfully",
      data: products,
    }).send(res);
  };

  static getProductById = async (req, res) => {
    const product = await ProductService.getProduct(req.params.productId);
    new OK({
      message: "Product retrieved successfully",
      data: product,
    }).send(res);
  };

  // Product Image

  static addProductImage = async (req, res) => {
    new OK({
      message: "Product image added successfully",
      data: await ProductService.addProductImages(req.params.productId, req.files),
    }).send(res);
  };

  // static updateProductImage = async (req, res) => {
  //   const product = await ProductService.updateProductImage(req.params.productId, req.body);
  //   new OK({
  //     message: "Product image updated successfully",
  //     data: product,
  //   }).send(res);
  // };

  static deleteProductImage = async (req, res) => {
    const product = await ProductService.deleteProductImage(req.params.productId, req.body);
    new OK({
      message: "Product image deleted successfully",
      data: product,
    }).send(res);
  };
}

module.exports = ProductController;
