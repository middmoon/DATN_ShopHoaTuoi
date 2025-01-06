"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Material.hasMany(models.MeterialImage, { foreignKey: "material_id" });

      Material.belongsTo(models.MaterialCategory, { foreignKey: "metetial_category_id" });

      Material.belongsToMany(models.Product, {
        through: "product_materials",
        foreignKey: "material_id",
        otherKey: "product_id",
      });
    }
  }

  Material.init(
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
      unit: {
        type: DataTypes.STRING,
      },
      stock_quantity: {
        type: DataTypes.INTEGER.UNSINGED,
      },
      metetial_category_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Material",
      tableName: "materials",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Material;
};
