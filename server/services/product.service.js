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
    const foundProduct = await Product.findByPk(productId);

    if (!foundProduct) {
      throw new NOTFOUND("Can not find product by id");
    }

    const { changedProductFields, categoryChanges, imageChanges } = payload;

    console.log(imageChanges);

    try {
      const result = await sequelize.transaction(async (t) => {
        if (Object.keys(changedProductFields).length > 0) {
          const updatedProduct = await foundProduct.update(changedProductFields, {
            where: { _id: productId },
            transaction: t,
          });

          if (!updatedProduct) {
            throw new BAD_REQUEST("Can not update product");
          }
        }

        if (categoryChanges.newCategories.length > 0) {
          const newCategoryData = categoryChanges.newCategories.map((categoryId) => ({
            product_id: productId,
            product_category_id: categoryId,
          }));

          const newProductCategories = await ProductCategoryMapping.bulkCreate(newCategoryData, { transaction: t });

          if (newProductCategories.length !== categoryChanges.newCategories.length) {
            throw new BAD_REQUEST("Can not create product category");
          }
        }

        if (categoryChanges.removedCategoryIds.length > 0) {
          const count = await ProductCategoryMapping.destroy({
            where: {
              product_id: productId,
              product_category_id: categoryChanges.removedCategoryIds,
            },
            transaction: t,
          });

          if (count !== categoryChanges.removedCategoryIds.length) {
            throw new BAD_REQUEST("Can not delete product category");
          }
        }

        if (imageChanges.removedImageIds.length > 0) {
          const deletedImageIds = imageChanges.removedImageIds.map((imageId) => ({
            productId,
            imageId,
          }));

          const deletedImageIdsData = deletedImageIds.map((imageId) => ({
            product_id: productId,
            img_url: imageId,
          }));

          await ProductImage.destroy({
            where: {
              product_id: productId,
              img_url: deletedImageIds,
            },
            transaction: t,
          });

          if (deletedImageIdsData.length !== deletedImageIds.length) {
            throw new BAD_REQUEST("Can not delete product image");
          }
        }

        if (imageChanges.newAvatarId !== undefined) {
          const oldAvatar = await ProductImage.findOne({
            where: {
              product_id: productId,
              is_avatar: true,
            },
            attributes: ["_id"],
            transaction: t,
          });

          await ProductImage.update(
            { is_avatar: false },
            {
              where: {
                product_id: productId,
                _id: oldAvatar._id,
              },
              transaction: t,
            }
          );

          const [count, newAvatar] = await ProductImage.update(
            { is_avatar: true },
            {
              where: {
                product_id: productId,
                _id: imageChanges.newAvatarId,
              },
              transaction: t,
            }
          );

          if (count.length === 0) {
            throw new BAD_REQUEST("Can not update product avatar");
          }
        }

        const product = await Product.findOne({
          where: { _id: productId },
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
          transaction: t,
        });

        if (!product) {
          throw new NOTFOUND("Can not find product by slug");
        }

        return product;
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  static getProducts = async (conditions = {}) => {
    const products = await Product.findAll({
      where: conditions,
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
  static addProductImages = async (productId, imageFiles, avatarIndex) => {
    const numberAvatarIndex = Number(avatarIndex);

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

  static deleteProductImages = async (productId, imageIds) => {};

  static updateProductAvatar = async (productId, imageId) => {};

  // static updateProductImages = async (id, image) => {};

  // static deleteProductImages = async (id, image) => {};
}

module.exports = ProductService;
