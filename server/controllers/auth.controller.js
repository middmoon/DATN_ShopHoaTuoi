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
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "strict" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });
    new OK({
      message: "Logout successfully",
      data: {},
    }).send(res);
  };

  static getRole = async (req, res) => {
    new OK({
      message: "Check role successfully",
      data: await AuthService.getRole(req._id),
    }).send(res);
  };

  static refreshToken = async (req, res) => {
    const accessToken = await AuthService.refreshToken();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // maxAge: 24 * 60 * 60 * 1000,
    });

    new OK({
      message: "Refresh token successfully",
      data: {
        accessToken,
      },
    }).send(res);
  };
}

module.exports = AuthController;
