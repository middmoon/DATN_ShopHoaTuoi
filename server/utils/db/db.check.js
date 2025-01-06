"use strict";

require("dotenv").config();

const db = require("../../models");

if (process.env.NODE_ENV !== "production") {
  db.sequelize
    .authenticate()
    .then(() => {
      const { host, port, database } = db.sequelize.config;

      console.log(`Connection established successfully.`);
      console.log(`Host: ${host}`);
      console.log(`Port: ${port}`);
      console.log(`Database: ${database}`);
    })
    .then(() => {
      console.log("Connection closed successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
} else {
  console.log("This script is only for development and testing environment.");
}
