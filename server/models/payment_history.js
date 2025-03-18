"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PaymentHistory extends Model {
    static associate(models) {
      PaymentHistory.belongsTo(models.Payment, {
        foreignKey: "payment_id",
        onDelete: "CASCADE",
      });

      PaymentHistory.belongsTo(models.Order, {
        foreignKey: "order_id",
      });
    }
  }

  PaymentHistory.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Chờ xác nhận", "Đang xử lý", "Hoàn thành", "Thất bại"),
        allowNull: false,
      },
      changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "PaymentHistory",
      tableName: "payment_histories",
      timestamps: true,
    }
  );

  return PaymentHistory;
};
