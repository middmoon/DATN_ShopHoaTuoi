"use strict";

require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("./error.response");

const createToken = (userId, secrect, expiresTime) => {
  const token = jwt.sign(
    {
      _id: userId,
    },
    secrect,
    {
      expiresIn: expiresTime,
    }
  );
  return token;
};

const createTokenPair = (userId) => {
  const accessToken = createToken(userId, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

  const refreshToken = createToken(userId, process.env.JWT_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);

  return {
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const newAccessToken = createToken(decoded._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

    return {
      accessToken: newAccessToken,
    };
  } catch (error) {
    throw new UNAUTHORIZED("Invalid refresh token");
  }
};

module.exports = { createToken, createTokenPair, refreshAccessToken };
