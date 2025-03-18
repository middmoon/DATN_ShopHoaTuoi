"use strict";

const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }

  AuditLog.init(
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
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // entity_id: {
      //   type: DataTypes.UUID,
      //   allowNull: true,
      // },
      request_params: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      request_query: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      request_data: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      response_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_agent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AuditLog",
      tableName: "audit_logs",
      timestamps: true,
    }
  );

  return AuditLog;
};
