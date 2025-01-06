"use strict";

require("dotenv").config();

const db = require("../../models");

if (process.env.NODE_ENV !== "production") {
  db.sequelize
    .sync()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
} else {
  console.log("This script is only for development and testing environment.");
}
