"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MaterialAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      MaterialAttribute.belongsToMany(models.Material, {
        through: models.MaterialAttributeMapping,
        foreignKey: "material_attr_id",
        otherKey: "material_id",
      });
    }
  }

  MaterialAttribute.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MaterialAttribute",
      tableName: "material_attributes",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      indexes: [
        {
          name: "key_value_index",
          fields: ["key", "value"],
        },
      ],
    }
  );

  return MaterialAttribute;
};
