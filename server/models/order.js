"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.District, {
        foreignKey: "district_code",
      });
      Order.belongsTo(models.Province, {
        foreignKey: "province_code",
      });
      Order.belongsTo(models.Ward, {
        foreignKey: "ward_code",
      });
      Order.belongsTo(models.User, {
        foreignKey: "customer_id",
      });
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
        foreignKey: "order_id",
        otherKey: "product_id",
      });
      Order.hasOne(models.Payment, {
        foreignKey: "order_id",
        as: "payment",
      });

      Order.belongsTo(models.OrderStatus, {
        foreignKey: "status_id",
      });
    }
  }

  Order.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM("Đơn online", "Đơn cửa hàng", "Đơn bán sĩ"),
        defaultValue: "Đơn online",
      },
      total_price: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      note: {
        type: DataTypes.TEXT,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      delivery_day: {
        type: DataTypes.DATE,
      },
      delivery_address: {
        type: DataTypes.STRING,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_phone: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "Order",
      // tableName: "orders",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Order;
};
