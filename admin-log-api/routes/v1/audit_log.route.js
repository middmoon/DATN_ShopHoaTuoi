const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const AuditLogController = require("../../controller/audit_log.controller");

router
  .get("/count", asyncHandler(AuditLogController.countAllAuditLogs))
  .get("/count/entity", asyncHandler(AuditLogController.countByEntity))
  .get("/daily-stats", asyncHandler(AuditLogController.getDailyStats))
  .get("/hourly-stats", asyncHandler(AuditLogController.getHourlyStats))
  .get("/error-stats", asyncHandler(AuditLogController.getErrorStats))
  .get("/response-distribution", asyncHandler(AuditLogController.getResponseDistribution))
  .get("/top-api-usage", asyncHandler(AuditLogController.getTopApiUsage))
  .get("/", function (req, res, next) {
    res.render("index", { title: "LOG API V1 - Audit logs" });
  });

module.exports = router;
