"use strict";

const { Model } = require("sequelize");
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

      Product.belongsTo(models.ProductCategory, { foreignKey: "product_category_id" });

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
    }
  }

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
      wholesale_price: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      retail_price: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      status: {
        type: DataTypes.ENUM("Còn hàng", "Hết hàng", "Ngưng kinh doanh"),
      },
      is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stock_quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      product_category_id: {
        type: DataTypes.INTEGER,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // avatar: {
      //   type: DataTypes.STRING,
      // },
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

  return Product;
};
