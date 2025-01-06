"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MaterialCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MaterialCategory.hasMany(models.Material, { foreignKey: "metetial_category_id" });
    }
  }

  MaterialCategory.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      desription: {
        type: DataTypes.TEXT,
      },
      img_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "MaterialCategory",
      tableName: "material_categories",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return MaterialCategory;
};
