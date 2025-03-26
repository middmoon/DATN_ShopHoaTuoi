"use strict";

const AuditLogService = require("../services/audit_log.service");
const { OK, CREATED } = require("../utils/success.response");

class AuditLogServiceController {
  static getAuditLogs = async (req, res) => {
    new OK({
      message: "get audit logs successfully",
      data: await AuditLogService.getAuditLogs(req.query),
    }).send(res);
  };

  static countAllAuditLogs = async (req, res) => {
    new OK({
      message: "get audit logs successfully",
      data: await AuditLogService.countAllAuditLogs(),
    }).send(res);
  };
}

module.exports = AuditLogServiceController;
