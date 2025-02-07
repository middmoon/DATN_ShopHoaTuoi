"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ProductCategory.hasMany(models.ProductCategory, { foreignKey: "parent_id" });

      ProductCategory.belongsTo(models.ProductCategory, { foreignKey: "parent_id" });

      ProductCategory.belongsToMany(models.Product, {
        through: models.ProductCategoryMapping,
        foreignKey: "product_category_id",
        otherKey: "product_id",
      });
    }
  }

  ProductCategory.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      img_url: {
        type: DataTypes.STRING,
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "ProductCategory",
      tableName: "product_categories",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return ProductCategory;
};
