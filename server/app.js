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
const swaggerDocument = require("./config/swagger.config");
const auditLogger = require("./middlewares/audit-logger.middleware");

// // prometheus metrics
// const client = require("prom-client");
// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics();

// const httpRequestsTotal = new client.Counter({
//   name: "http_requests_total",
//   help: "Total number of HTTP requests",
//   labelNames: ["method", "status"],
// });

// app.use(async (req, res, next) => {
//   res.on("finish", () => {
//     httpRequestsTotal.inc({ method: req.method, status: res.statusCode });
//   });
//   next();
// });

// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", client.register.contentType);
//   try {
//     const metrics = await client.register.metrics();
//     res.end(metrics);
//   } catch (err) {
//     res.status(500).send("Error fetching metrics");
//   }
// });

// // prometheus metrics

app.set("view engine", "ejs");

app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: [`http://localhost:${process.env.CIENT_PORT}`, `http://localhost:${process.env.ADMIN_PORT}`, "http://localhost:4001"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
} else {
  app.use(logger("dev"));
}

//app.use(attachApiKey);
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
