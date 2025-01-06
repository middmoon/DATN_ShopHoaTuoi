"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MeterialImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MeterialImage.belongsTo(models.Material, { foreignKey: "material_id" });
    }
  }

  MeterialImage.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      img_url: {
        type: DataTypes.STRING,
      },
      material_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "MeterialImage",
      tableName: "material_images",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return MeterialImage;
};
