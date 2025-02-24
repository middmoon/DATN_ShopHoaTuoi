"use strict";

const { OK, CREATED } = require("../utils/success.response");
const { BAD_REQUEST } = require("../utils/error.response");

const ProductService = require("../services/product.service");

const { Product } = require("../models");

class ProductController {
  static createProduct = async (req, res) => {
    // new CREATED({
    //   message: "Product created successfully",
    //   data: await ProductService.createProduct(req.body),
    // }).send(res);

    new CREATED({
      message: "Product created successfully",
      data: req.body,
    }).send(res);

    console.log(req.body);
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
    new OK({
      message: "Product retrieved successfully",
      data: await ProductService.getProductById(req.params.productId),
    }).send(res);
  };

  static getProductBySlug = async (req, res) => {
    new OK({
      message: "Product retrieved successfully",
      data: await ProductService.getProductBySlug(req.params.productSlug),
    }).send(res);
  };

  // Product Image

  static addProductImage = async (req, res) => {
    // if (!req.params.productId || !req.files || !req.body.avatarIndex) {
    //   return new BAD_REQUEST("Missing parameters");
    // }

    // new OK({
    //   message: "Product image added successfully",
    //   data: await ProductService.addProductImages(req.params.productId, req.files, req.body.avatar),
    // }).send(res);

    console.log({
      productId: req.params.productId,
      images: req.files,
      avatarIndex: req.body.avatar,
      imagesCount: req.files.length,
      typeofAvatarIndex: typeof req.body.avatar,
    });

    new OK({
      message: "Product image added successfully",
      data: {
        productId: req.params.productId,
        images: req.files,
        avatarIndex: req.body.avatarIndex,
        typeofAvatarIndex: typeof req.body.avatarIndex,
      },
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
