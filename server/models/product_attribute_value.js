"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductAttributeValue extends Model {
    static associate(models) {
      ProductAttributeValue.belongsTo(models.ProductAttribute, {
        foreignKey: "attribute_id",
      });

      ProductAttributeValue.belongsToMany(models.Product, {
        through: models.ProductAttributeMapping,
        foreignKey: "attribute_value_id",
        otherKey: "product_id",
      });
    }
  }

  ProductAttributeValue.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Value of key
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      extra_price: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      extra_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ProductAttributeValue",
      tableName: "product_attribute_values",
      timestamps: true,
    }
  );

  return ProductAttributeValue;
};
