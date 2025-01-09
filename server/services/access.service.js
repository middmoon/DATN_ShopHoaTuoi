"use strict";

const { CRETED, OK } = require("../utils/success.response");
const { BAD_REQUEST, FORBIDDEN, NOTFOUND } = require("../utils/error.response");

const { sequelize, User, UserRole, Role } = require("../models");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const { getInfoData } = require("../utils");
const { createTokenPair } = require("../utils/token");

/**
 * // id: 1
  name: "owner", 
  // id: 2
  name: "sys_admin",
  // id: 3
  name: "employee",
  // id: 4
  name: "customer",
 */

class AccessService {
  static registerUser = async ({ email, password }, role = "customer") => {
    if (!emailValidator.validate(email)) {
      throw new BAD_REQUEST("Email is not valid");
    }

    const foundUser = await User.findOne({
      where: { email },
      attributes: ["_id"],
    });

    if (foundUser) {
      throw new BAD_REQUEST("Error: Account already registered");
    }
    const t = await sequelize.transaction();
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create(
        {
          email,
          password: hashedPassword,
        },
        { transaction: t }
      );
      if (!newUser) {
        throw new BAD_REQUEST("Can not create user");
      }
      const userRole = await Role.findOne({ where: { name: role } });
      if (!userRole) {
        throw new BAD_REQUEST("Can not find role for user");
      }
      const newRole = await UserRole.create(
        {
          user_id: newUser._id,
          role_id: userRole._id,
        },
        { transaction: t }
      );
      if (!newRole) {
        throw new BAD_REQUEST("Can not add role");
      }
      await t.commit();
      return {
        user: getInfoData({
          fields: ["_id"],
          object: newUser,
        }),
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  static loginUser = async ({ option, password }) => {
    let foundUser;

    if (emailValidator.validate(option)) {
      foundUser = await User.findOne({ where: { email: option } });
    } else {
      foundUser = await User.findOne({ where: { username: option } });
    }

    if (!foundUser) {
      throw new BAD_REQUEST("User not found");
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);

    if (!validPassword) {
      throw new BAD_REQUEST("Invalid password");
    }

    if (foundUser && validPassword) {
      const { accessToken, refreshToken } = createTokenPair(foundUser._id);

      return {
        accessToken,
        refreshToken,
        // user: getInfoData({
        //   fields: ["_id"],
        //   object: foundUser,
        // }),
      };
    }
  };

  static getUser = async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NOTFOUND("User not found");
    }

    return user;
  };

  //extend

  // async resetPassword(user) {}

  // async fogotPassword(user) {}
}

module.exports = AccessService;
