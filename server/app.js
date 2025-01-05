"use strict";

require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./configs/swagger.config");

app.use(helmet());
app.use(compression());

// app.use(
//   cors({
//     origin: `http://localhost:${process.env.CLIENT_PORT}`,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true, // Allow cookies to be sent
//   })
// );

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
} else {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes"));

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const response = {
    status: "error",
    code: statusCode,
    message: error.message || "Internal Error",
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  console.error(error.stack);

  return res.status(statusCode).json(response);
});

module.exports = app;
