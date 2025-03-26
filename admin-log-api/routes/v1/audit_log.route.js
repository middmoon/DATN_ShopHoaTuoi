const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const AuditLogController = require("../../controller/audit_log.controller");

router
  .get("/", function (req, res, next) {
    res.render("index", { title: "LOG API V1 - Audit logs" });
  })
  .get("/count", asyncHandler(AuditLogController.countAllAuditLogs));

module.exports = router;
