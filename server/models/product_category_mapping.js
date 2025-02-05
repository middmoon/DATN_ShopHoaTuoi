"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCategoryMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCategoryMapping.belongsTo(models.Product, { foreignKey: "product_id" });

      ProductCategoryMapping.belongsTo(models.ProductCategory, { foreignKey: "product_category_id" });
    }
  }

  ProductCategoryMapping.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductCategoryMapping",
      tableName: "product_ctgr_mapping",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return ProductCategoryMapping;
};
