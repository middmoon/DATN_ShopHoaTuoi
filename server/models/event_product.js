"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventProduct.belongsTo(models.Event, {
        foreignKey: "event_id",
      });

      EventProduct.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }

  EventProduct.init(
    {
      event_id: {
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "EventProduct",
      tableName: "event_products",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return EventProduct;
};
