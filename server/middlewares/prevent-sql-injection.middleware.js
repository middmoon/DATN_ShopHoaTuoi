"use strict";

const { FORBIDDEN } = require("../utils/error.response");

const preventSQLInjection = (object) => {
  return async (req, res, next) => {
    if (object.hasOwnProperty("query")) {
      if (object.query.includes(";")) {
        return next(new FORBIDDEN("SQL Injection"));
      }
    } else if (object.hasOwnProperty("body")) {
      if (object.body.query.includes(";")) {
        return next(new FORBIDDEN("SQL Injection"));
      }
    }

    next();
  };
};

module.exports = { preventSQLInjection };
