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
      },
      attribute_value_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductAttributeMapping",
      tableName: "product_attrb_mapping",
      timestamps: true,
    }
  );

  return ProductAttributeMapping;
};
