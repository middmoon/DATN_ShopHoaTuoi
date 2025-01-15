"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      OrderProduct.belongsTo(models.Order, {
        foreignKey: "order_id",
      });

      OrderProduct.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }

  OrderProduct.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderProduct",
      tableName: "order_products",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return OrderProduct;
};
