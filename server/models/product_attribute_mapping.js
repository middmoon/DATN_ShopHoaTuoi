"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductAttributeMapping extends Model {
    static associate(models) {
      ProductAttributeMapping.belongsTo(models.Product, {
        foreignKey: "product_id",
      });

      ProductAttributeMapping.belongsTo(models.ProductAttributeValue, {
        foreignKey: "attribute_value_id",
      });
    }
  }

  ProductAttributeMapping.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "_id",
        },
      },
      attribute_value_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product_attribute_values",
          key: "_id",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductAttributeMapping",
      tableName: "product_attribute_mappings",
      timestamps: false,
    }
  );

  return ProductAttributeMapping;
};
