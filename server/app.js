"use strict";

require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const attachApiKey = require("./middlewares/attach_api_key.middleware");
const app = express();

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.config");
const auditLogger = require("./middlewares/audit-loger.middleware");

app.set("view engine", "ejs");

app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: [`http://localhost:${process.env.CLIENT_PORT}`, `http://localhost:${process.env.ADMIN_PORT}`],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
} else {
  app.use(logger("dev"));
}

// app.use(attachApiKey);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// audit logger
app.use(auditLogger);

app.use("/", require("./routes"));

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  // app.use("/test", require("./test/apis/v1"));
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
