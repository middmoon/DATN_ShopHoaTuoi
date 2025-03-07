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
      method: {
        type: DataTypes.ENUM(
          "Tiền mặt",
          "Thẻ tín dụng",
          "Paypal",
          "Momo",
          "VN Pay",
          "Zalo Pay",
          "Chuyển khoản ngân hàng",
          "Thanh toán khi nhận hàng"
        ),
      },
      status: {
        type: DataTypes.ENUM("Chờ xác nhận", "Đang xử lý", "Hoàn thành", "Thất bại"),
        defaultValue: "Chờ xác nhận",
      },
      delivery_day: {
        type: DataTypes.DATE,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
