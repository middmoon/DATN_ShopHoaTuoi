"use strict";

const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SearchLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }

  SearchLog.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      search_query: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      // type search_results: { product_list_ids: [1, 2, 3] }
      product_results: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SearchLog",
      tableName: "search_logs",
      timestamps: true,
    }
  );

  return SearchLog;
};
