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
      Product.hasMany(models.ProductImage, { foreignKey: "product_id" });

      Product.belongsTo(models.ProductCategory, { foreignKey: "product_category_id" });

      Product.belongsToMany(models.Material, {
        through: "product_materials",
        foreignKey: "product_id",
        otherKey: "material_id",
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
        type: DataTypes.INTEGER.UNSINGED,
      },
      retail_price: {
        type: DataTypes.INTEGER.UNSINGED,
      },
      status: {
        type: DataTypes.ENUM("Còn hàng", "Hết hàng", "Ngưng kinh doanh"),
      },
      stock_quantity: {
        type: DataTypes.INTEGER.UNSINGED,
      },
      product_category_id: {
        type: DataTypes.INTEGER,
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

  return Product;
};