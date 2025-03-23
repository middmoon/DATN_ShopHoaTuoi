"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CustomerAddress.belongsTo(models.District, {
        foreignKey: "district_code",
      });
      CustomerAddress.belongsTo(models.Province, {
        foreignKey: "province_code",
      });
      CustomerAddress.belongsTo(models.Ward, {
        foreignKey: "ward_code",
      });
      CustomerAddress.belongsTo(models.Ward, {
        foreignKey: "ward_code",
      });
    }
  }

  CustomerAddress.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
      },
      delivery_address: {
        type: DataTypes.STRING,
      },
      ward_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      district_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      province_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CustomerAddress",
      tableName: "customer_address",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return CustomerAddress;
};
