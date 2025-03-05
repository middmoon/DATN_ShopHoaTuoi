"use strict";

const slugify = require("slugify");

const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductImage, {
        foreignKey: "product_id",
      });

      Product.belongsToMany(models.ProductCategory, {
        through: models.ProductCategoryMapping,
        foreignKey: "product_id",
        otherKey: "product_category_id",
      });

      Product.belongsToMany(models.Material, {
        through: models.ProductMaterial,
        foreignKey: "product_id",
        otherKey: "material_id",
      });

      Product.belongsToMany(models.Order, {
        through: models.OrderProduct,
        foreignKey: "product_id",
        otherKey: "order_id",
      });

      Product.belongsToMany(models.ProductAttributeValue, {
        through: models.ProductAttributeMapping,
        foreignKey: "product_id",
        otherKey: "attribute_value_id",
      });

      //Product Atribute 2
    }
  }

  //   const productInfo: {
  //     _id: number;
  //     name: string;
  //     description: string;
  //     retail_price: number;
  //     status: string;
  //     slug: string;
  //     unit: string;
  //     is_feature: boolean;
  //     is_public: boolean;
  // }
  Product.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      retail_price: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      status: {
        type: DataTypes.ENUM("Còn hàng", "Hết hàng", "Ngưng kinh doanh"),
        defaultValue: "Còn hàng",
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
      },
      is_feature: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Product.afterCreate(async (product, options) => {
    product.slug = slugify(product.name + " " + product._id, {
      replacement: "-",
      remove: undefined,
      lower: false,
      strict: false,
      locale: "vi",
      trim: true,
    });

    await Product.update(
      { slug: product.slug },
      {
        where: {
          _id: product._id,
        },
        transaction: options.transaction,
      }
    );
  });

  Product.beforeUpdate(async (product) => {
    if (product.changed("name") && product.previous("name") !== product.name) {
      product.slug = slugify(product.name + product._id, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true,
      });
    }
  });

  return Product;
};
