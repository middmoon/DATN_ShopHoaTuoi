"use strict";

const { sequelize, Product, ProductImage } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

const cloudinary = require("../config/cloudiary.config");

class ProductService {
  static createProduct = async (payload) => {
    const newProduct = await Product.create(payload);

    if (!newProduct) {
      throw BAD_REQUEST("Can not create product");
    }

    return newProduct;
  };

  static deleteProduct = async (productId) => {
    const deletedProduct = await Product.destroy({ where: { productId } });
    return deletedProduct;
  };

  static updateProduct = async (productId, payload) => {
    const updatedProduct = await Product.update(payload, {
      where: { productId },
    });
    return updatedProduct;
  };

  static getProducts = async (conditions) => {
    const products = await Product.findAll(conditions);
    return products;
  };

  static getProductById = async (conditions) => {
    const product = await Product.findByPk(productId);
    return product;
  };

  // Product Image
  // Avatar
  static updateProductAvatar = async (productId, imageId, option) => {
    // option: true, false
    const [count, updatedImage] = await ProductImage.update(
      { is_validated: option },
      {
        where: {
          product_id: productId,
          _id: imageId,
        },
        returning: true,
      }
    );

    if (count === 0) {
      throw new NOTFOUND("Can not update product avatar");
    }

    return updatedImage;
  };

  // Images
  static addProductImages = async (productId, imageFiles) => {
    const uploadedImages = [];
    const uploadPromises = imageFiles.map(async (imageFile) => {
      try {
        const result = await cloudinary.uploader.upload(imageFile.path, {
          folder: "product_images",
          use_filename: true,
          unique_filename: false,
        });

        const uploadedImage = await ProductImage.create({
          product_id: productId,
          img_url: result.url,
        });

        uploadedImages.push(result.url);
        return uploadedImage;
      } catch (error) {
        throw new BAD_REQUEST(`Error: Can not upload image or save to the database`);
      }
    });

    await Promise.all(uploadPromises);

    return { uploadedImages };
  };

  static updateProductImages = async (id, image) => {};

  static deleteProductImages = async (id, image) => {};
}

module.exports = ProductService;
