"use strict";

const { sequelize, AuditLog } = require("../models");
const { BAD_REQUEST, NOTFOUND } = require("../../server/utils/error.response");
const { fn, col, literal, Op } = require("sequelize");

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

  static countByEntity = async () => {
    const count = await AuditLog.findAll({
      attributes: [
        [
          literal(`CASE 
                     WHEN entity LIKE 'product%' THEN 'product' 
                     ELSE entity 
                   END`),
          "entity",
        ],
        [fn("COUNT", col("entity")), "count"],
      ],
      group: [
        literal(`CASE 
                   WHEN entity LIKE 'product%' THEN 'product' 
                   ELSE entity 
                 END`),
      ],
    });

    if (!count) {
      throw new NOTFOUND("Can not get audit logs");
    }

    return count;
  };

  static getTopApiUsage = async () => {
    const results = await AuditLog.findAll({
      attributes: ["entity", "action", [AuditLog.sequelize.fn("COUNT", AuditLog.sequelize.col("id")), "total"]],
      group: ["entity", "action"],
      order: [[AuditLog.sequelize.literal("total"), "DESC"]],
      limit: 10,
    });

    return results;
  };

  static getDailyStats = async () => {
    const results = await AuditLog.findAll({
      attributes: [
        [AuditLog.sequelize.fn("DATE", AuditLog.sequelize.col("createdAt")), "date"],
        [AuditLog.sequelize.fn("COUNT", AuditLog.sequelize.col("id")), "total"],
      ],
      group: [AuditLog.sequelize.fn("DATE", AuditLog.sequelize.col("createdAt"))],
      order: [[AuditLog.sequelize.fn("DATE", AuditLog.sequelize.col("createdAt")), "ASC"]],
    });

    return results;
  };

  static getErrorStats = async () => {
    const results = await AuditLog.findAll({
      attributes: ["response_status", [AuditLog.sequelize.fn("COUNT", AuditLog.sequelize.col("id")), "total"]],
      where: {
        response_status: {
          [Op.gte]: 400,
        },
      },
      group: ["response_status"],
      order: [[AuditLog.sequelize.literal("total"), "DESC"]],
    });

    return results;
  };

  static getHourlyStats = async () => {
    const results = await AuditLog.findAll({
      attributes: [
        [literal("HOUR(CONVERT_TZ(`createdAt`, '+00:00', '+07:00'))"), "hour"],
        [fn("COUNT", col("id")), "total"],
      ],
      group: [literal("HOUR(CONVERT_TZ(`createdAt`, '+00:00', '+07:00'))")],
      order: [[literal("hour"), "ASC"]],
    });

    const dbData = results.map((r) => r.get());

    // Đảm bảo đủ 24 giờ
    const hourlyStats = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      total: 0,
    }));

    dbData.forEach(({ hour, total }) => {
      hourlyStats[parseInt(hour)].total = parseInt(total);
    });

    return hourlyStats;
  };

  static getResponseDistribution = async () => {
    const results = await AuditLog.findAll({
      attributes: ["response_status", [AuditLog.sequelize.fn("COUNT", AuditLog.sequelize.col("id")), "total"]],
      where: {
        response_status: { [Op.ne]: null },
      },
      group: ["response_status"],
      order: [[AuditLog.sequelize.literal("total"), "DESC"]],
    });

    return results;
  };
}

module.exports = AuditLogService;
