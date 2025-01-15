"use strict";

const AuthService = require("../services/auth.service");
const { OK, CREATED } = require("../utils/success.response");

class AuthController {
  static registerUser = async (req, res) => {
    new CREATED({
      message: "User created successfully",
      data: await AuthService.registerUser(req.body, req.body.role),
    }).send(res);
  };

  static loginUser = async (req, res) => {
    const { accessToken, refreshToken } = await AuthService.loginUser(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    new OK({
      message: "Login successfully",
      data: {
        accessToken,
        refreshToken,
      },
    }).send(res);
  };

  static logoutUser = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    new OK({
      message: "Logout successfully",
      data: {},
    }).send(res);
  };
}

module.exports = AuthController;
