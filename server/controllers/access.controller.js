"use strict";

const AccessService = require("../services/access.service");
const { OK, CREATED } = require("../utils/success.response");

class AccessController {
  static registerUser = async (req, res) => {
    new CREATED({
      message: "User created successfully",
      data: await AccessService.registerUser(req.body, req.body.role),
    }).send(res);
  };

  static loginUser = async (req, res) => {
    const { accessToken, refreshToken } = await AccessService.loginUser(req.body);

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

module.exports = AccessController;
