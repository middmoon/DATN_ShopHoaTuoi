"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MaterialAttributeMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      MaterialAttributeMapping.belongsTo(models.Material, {
        foreignKey: "material_id",
      });

      MaterialAttributeMapping.belongsTo(models.MaterialAttribute, {
        foreignKey: "material_atrr_id",
      });
    }
  }

  MaterialAttributeMapping.init(
    {
      material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      material_attr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MaterialAttributeMapping",
      tableName: "material_attr_map",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return MaterialAttributeMapping;
};
