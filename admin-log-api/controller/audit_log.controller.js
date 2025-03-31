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

  static countByEntity = async (req, res) => {
    new OK({
      message: "get audit logs successfully",
      data: await AuditLogService.countByEntity(req.query),
    }).send(res);
  };

  static getTopApiUsage = async (req, res) => {
    new OK({
      message: "get audit logs successfully",
      data: await AuditLogService.getTopApiUsage(),
    }).send(res);
  };

  static getDailyStats = async (req, res) => {
    new OK({
      message: "get audit logs successfully",
      data: await AuditLogService.getDailyStats(),
    }).send(res);
  };

  static getErrorStats = async (req, res) => {
    new OK({
      message: "get audit logs successfully",
      data: await AuditLogService.getErrorStats(),
    }).send(res);
  };

  static getHourlyStats = async (req, res) => {
    new OK({
      message: "get audit logs successfully",
      data: await AuditLogService.getHourlyStats(),
    }).send(res);
  };

  static getResponseDistribution = async (req, res) => {
    new OK({
      message: "get audit logs successfully",
      data: await AuditLogService.getResponseDistribution(),
    }).send(res);
  };
}

module.exports = AuditLogServiceController;
