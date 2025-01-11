"use strict";

const ProductService = require("../services/product.service");
const { OK, CREATED } = require("../utils/success.response");
const { BAD_REQUEST } = require("../utils/error.response");
const { ProductValidation } = require("../utils/validation");
const { Product } = require("../models");

class ProductController {
  static getProducts = async (req, res) => {
    const products = await ProductService.getProducts();
    new OK({
      message: "Products retrieved successfully",
      data: products,
    }).send(res);
  };

  static getProduct = async (req, res) => {
    const product = await ProductService.getProduct(req.params.productId);
    new OK({
      message: "Product retrieved successfully",
      data: product,
    }).send(res);
  };

  static createProduct = async (req, res) => {
    const product = await ProductService.createProduct(req.body);
    new CREATED({
      message: "Product created successfully",
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

  static deleteProduct = async (req, res) => {
    const product = await ProductService.deleteProduct(req.params.productId);
    new OK({
      message: "Product deleted successfully",
      data: product,
    }).send(res);
  };
}
