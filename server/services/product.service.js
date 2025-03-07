"use strict";

const { sequelize, Product, ProductImage, ProductCategory, ProductCategoryMapping } = require("../models");
const { Op, where } = require("sequelize");

const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

const cloudinary = require("../config/cloudinary.config");

class ProductService {
  static createProduct = async (payload) => {
    const { categories, ...product } = payload;

    if (Array.isArray(categories) && categories.length > 0) {
      const foundCategories = await ProductCategory.findAll({
        where: {
          _id: {
            [Op.in]: categories.map((category) => category._id),
          },
        },
        attributes: ["_id"],
      });

      if (!foundCategories || foundCategories.length === 0) {
        throw new BAD_REQUEST("Can not find product category");
      }

      const foundCategoryIds = foundCategories.map((category) => category._id);

      const diff = categories.filter((category) => !foundCategoryIds.includes(category._id));

      if (diff.length > 0) {
        throw new BAD_REQUEST(`Can not find product category: ${diff.map((cat) => cat._id + " - " + cat.name).join(", ")}`);
      }
    }

    try {
      const result = await sequelize.transaction(async (t) => {
        const newProduct = await Product.create(product, { transaction: t });

        if (!newProduct) {
          throw new BAD_REQUEST("Can not create product");
        }

        let newProductCategories = [];
        //#region method 1
        if (categories.length > 0) {
          newProductCategories = await ProductCategoryMapping.bulkCreate(
            categories.map((category) => {
              return {
                product_id: newProduct._id,
                product_category_id: category._id,
              };
            }),
            { transaction: t, returning: true }
          );

          if (!newProductCategories || newProductCategories.length === 0 || newProductCategories.length != categories.length) {
            throw new BAD_REQUEST("Can not create product category");
          }
        }

        return { product: newProduct, categories: newProductCategories };

        //#endregion

        //#region method 2
        // if (!categories.length || categories.length === 0) {
        //   for (const category of categories) {
        //     const productCategory = await ProductCategory.findByPk({
        //       where: { _id: category },
        //       transaction: t,
        //     });

        //     if (!productCategory) {
        //       throw BAD_REQUEST(`Can not find product category ${category.name} with id ${category._id}`);
        //     }

        //     const newProductCategory = await ProductCategory.create(
        //       {
        //         product_id: newProduct._id,
        //         parent_id: productCategory._id,
        //       },
        //       { transaction: t }
        //     );

        //     if (!newProductCategory) {
        //       throw BAD_REQUEST("Can not create product category");
        //     }
        //   }
        // }

        //#endregion
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  // static deleteProduct = async (productId) => {
  //   const deletedProduct = await Product.destroy({ where: { productId } });
  //   return deletedProduct;
  // };

  static updateProduct = async (productId, payload) => {
    const updatedProduct = await Product.update(payload, {
      where: { productId },
    });
    return updatedProduct;
  };

  static getProducts = async () => {
    const products = await Product.findAll({
      include: [
        {
          model: ProductCategory,
          attributes: ["_id", "name"],
          through: {
            attributes: [],
          },
        },
        {
          model: ProductImage,
          attributes: ["is_avatar", "img_url"],
        },
      ],
    });
    return products;
  };

  static getProductById = async (productId) => {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new NOTFOUND("Can not find product by id");
    }

    return product;
  };

  static getProductBySlug = async (productSlug) => {
    const product = await Product.findOne({
      where: { slug: productSlug },
      include: [
        {
          model: ProductCategory,
          attributes: ["_id", "name"],
          through: {
            attributes: [],
          },
        },

        {
          model: ProductImage,
          attributes: ["_id", "img_url", "is_avatar"],
        },
      ],
    });

    if (!product) {
      throw new NOTFOUND("Can not find product by slug");
    }

    return product;
  };

  // Product Category
  static addCategory = async (productId, categoryId) => {
    const newCategory = await ProductCategoryMapping.create({
      product_id: productId,
      product_category_id: categoryId,
    });

    if (!newCategory) {
      throw BAD_REQUEST("Can not create product category");
    }

    return newCategory;
  };

  static deleteCategory = async (productId, categoryId) => {
    const deletedCategory = await ProductCategoryMapping.destroy({
      where: { product_id: productId, product_category_id: categoryId },
    });

    if (!deletedCategory) {
      throw BAD_REQUEST("Can not delete product category");
    }

    return deletedCategory;
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
  // static addProductImages = async (productId, imageFiles, avatarIndex) => {
  //   const uploadedImages = [];

  //   const numberAvatarIndex = Number(avatarIndex);

  //   const uploadPromises = imageFiles.map(async (imageFile, index) => {
  //     try {
  //       const result = await cloudinary.uploader.upload(imageFile.path, {
  //         folder: "product_images",
  //         use_filename: true,
  //         unique_filename: false,
  //       });

  //       const uploadedImage = await ProductImage.create({
  //         product_id: productId,
  //         img_url: result.url,
  //         is_avatar: index === numberAvatarIndex,
  //       });

  //       uploadedImages.push({
  //         url: result.url,
  //         is_avatar: uploadedImage.is_avatar,
  //       });

  //       return uploadedImage;
  //     } catch (error) {
  //       throw new BAD_REQUEST(`Error: Can not upload image or save to the database`);
  //     }
  //   });

  //   await Promise.all(uploadPromises);

  //   return { uploadedImages };
  // };

  static addProductImages = async (productId, imageFiles, avatarIndex) => {
    const numberAvatarIndex = Number(avatarIndex);

    console.log(avatarIndex);

    if (isNaN(numberAvatarIndex)) {
      throw new Error("Invalid avatarIndex: Must be a number or a string that can be converted to a number.");
    }

    const uploadResults = await Promise.all(
      imageFiles.map(async (imageFile) => {
        try {
          return await cloudinary.uploader.upload(imageFile.path, {
            folder: "product_images",
            use_filename: true,
            unique_filename: false,
          });
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          throw new Error("Error uploading images to Cloudinary.");
        }
      })
    );

    const productImagesData = uploadResults.map((result, index) => ({
      product_id: productId,
      img_url: result.url,
      is_avatar: index === numberAvatarIndex,
    }));

    const createdImages = await ProductImage.bulkCreate(productImagesData);

    return { uploadedImages: createdImages };
  };

  // static updateProductImages = async (id, image) => {};

  // static deleteProductImages = async (id, image) => {};
}

module.exports = ProductService;
