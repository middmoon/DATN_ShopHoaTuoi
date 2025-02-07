"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRole.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      UserRole.belongsTo(models.Role, {
        foreignKey: "role_id",
      });
    }
  }

  UserRole.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "user_roles",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return UserRole;
};
