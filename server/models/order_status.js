"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderStatus.hasMany(models.Order, {
        foreignKey: "status_id",
      });
    }
  }

  OrderStatus.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "OrderStatus",
      tableName: "order_statuses",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return OrderStatus;
};
