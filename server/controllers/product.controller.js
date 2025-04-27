"use strict";

const { OK, CREATED } = require("../utils/success.response");

const ProductService = require("../services/product.service");

const { buildQueryOptions, buildQueryOptions2, buildQueryOptionsForShopOrder } = require("../utils/query_option_builder");

const redis = require("../config/redis.config");

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
    const { data } = req.body;
    const parsedData = JSON.parse(data);

    try {
      const keys = await redis.keys("product:search*");
      if (keys.length > 0) {
        await redis.del(keys);
        console.log("🗑️ Cleared cache keys:", keys);
      }

      new OK({
        message: "Product updated successfully",
        data: await ProductService.updateProduct(req.params.productId, parsedData, req.files),
      }).send(res);
    } catch (error) {
      console.error("❌ Error updating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  static getProducts = async (req, res) => {
    const queryOptions = await buildQueryOptions2(req.query);

    // console.log(queryOptions);

    new OK({
      message: "Products retrieved successfully",
      data: await ProductService.getProducts(queryOptions),
    }).send(res);
  };

  static getProductsForShopOrder = async (req, res) => {
    const queryOptions = await buildQueryOptionsForShopOrder(req.query);
    // const queryOptions = await buildQueryOptions2(req.query);

    new OK({
      message: "Products retrieved successfully",
      data: await ProductService.getProductsForShopOrder(queryOptions),
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

  static getProductsBasic = async (req, res) => {
    new OK({
      message: "Products retrieved successfully",
      data: await ProductService.getProductsBasic(),
    }).send(res);
  };

  // Product Image

  static addProductImage = async (req, res) => {
    new OK({
      message: "Product image added successfully",
      data: await ProductService.addProductImages(req.params.productId, req.files, req.body.avatar),
    }).send(res);

    // new OK({
    //   message: "Product image added successfully",
    //   data: {
    //     productId: req.params.productId,
    //     images: req.files,
    //     avatarIndex: req.body.avatarIndex,
    //     typeofAvatarIndex: typeof req.body.avatarIndex,
    //   },
    // }).send(res);

    // console.log({
    //   productId: req.params.productId,
    //   images: req.files,
    //   avatarIndex: req.body.avatar,
    //   imagesCount: req.files.length,
    //   typeofAvatarIndex: typeof req.body.avatar,
    // });
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
