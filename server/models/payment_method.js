"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    static associate(models) {
      PaymentMethod.hasMany(models.Payment, {
        foreignKey: "method_id",
      });
    }
  }

  PaymentMethod.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PaymentMethod",
      tableName: "payment_methods",
      timestamps: false,
    }
  );

  return PaymentMethod;
};
