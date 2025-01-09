"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "user_id",
        otherKey: "role_id",
      });
    }
  }

  User.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return User;
};
