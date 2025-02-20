"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductAttribute extends Model {
    static associate(models) {
      ProductAttribute.hasMany(models.ProductAttributeValue, {
        foreignKey: "attribute_id",
      });
    }
  }

  ProductAttribute.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "ProductAttribute",
      tableName: "product_attributes",
      timestamps: true,
    }
  );

  return ProductAttribute;
};
