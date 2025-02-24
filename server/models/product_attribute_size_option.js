"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductAttributeSizeOption extends Model {}

  ProductAttributeSizeOption.init(
    {
      size: {
        type: DataTypes.ENUM("Nhỏ", "Trung bình", "Lớn"),
        allowNull: false,
      },
      extra_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      extra_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductAttributeSizeOption",
      tableName: "product_attrs_size",
      timestamps: true,
    }
  );

  return ProductAttributeSizeOption;
};
