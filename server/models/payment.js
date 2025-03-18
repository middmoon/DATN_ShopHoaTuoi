"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Payment.belongsTo(models.Order, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });

      Payment.belongsTo(models.PaymentMethod, {
        foreignKey: "method_id",
      });
    }
  }

  Payment.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      method_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4,
      },
      status: {
        type: DataTypes.ENUM("Chờ xác nhận", "Đang xử lý", "Hoàn thành", "Thất bại"),
        defaultValue: "Chờ xác nhận",
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      info: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Payment;
};
