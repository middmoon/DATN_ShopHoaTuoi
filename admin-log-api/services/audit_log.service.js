"use strict";

const { sequelize, AuditLog } = require("../models");
const { BAD_REQUEST, NOTFOUND } = require("../../server/utils/error.response");

class AuditLogService {
  static getAuditLogs = async (query) => {
    const auditLogs = await AuditLog.findAll({
      where: query,
      order: [["createdAt", "DESC"]],
    });

    if (!auditLogs) {
      throw new NOTFOUND("Can not get audit logs");
    }

    return auditLogs;
  };

  static countAllAuditLogs = async () => {
    const count = await AuditLog.count();

    if (!count) {
      throw new NOTFOUND("Can not get audit logs");
    }

    return count;
  };
}

module.exports = AuditLogService;
