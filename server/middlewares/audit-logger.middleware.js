"use strict";
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { connectRabbitMQ, getChannel, QUEUE_NAMES } = require("../config/rabbitmq.config");

let isConnected = false;
const initializeRabbitMQ = async () => {
  if (!isConnected) {
    try {
      await connectRabbitMQ();
      isConnected = true;
      console.log("RabbitMQ initialized for all queues");
    } catch (error) {
      console.error("Failed to initialize RabbitMQ:", error);
    }
  }
};

initializeRabbitMQ();

const auditLogger = async (req, res, next) => {
  res.on("finish", async () => {
    let userId = null;

    if (req.cookies.accessToken) {
      try {
        const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        userId = decoded.user._id;
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }

    const logData = {
      user_id: userId,
      action: `${req.method} ${req.originalUrl}`,
      entity: req.originalUrl.split("/")[3] || "unknown",
      entity_id: req.params._id || null,
      request_data: req.body ? omitSensitiveData(req.body) : null,
      response_status: res.statusCode,
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
    };

    // Send log to RabbitMQ audit_logs queue
    const channel = getChannel(QUEUE_NAMES.AUDIT_LOGS);
    if (channel) {
      try {
        channel.sendToQueue(QUEUE_NAMES.AUDIT_LOGS, Buffer.from(JSON.stringify(logData)), { persistent: true });
        console.log("Audit log sent to RabbitMQ:", logData.action);
      } catch (error) {
        console.error("Failed to send audit log:", error);
      }
    } else {
      console.warn("RabbitMQ channel not available for audit_logs, log not sent:", logData);
    }
  });

  next();
};

function omitSensitiveData(data) {
  if (!data || typeof data !== "object") return data;
  // "confirmPassword", "oldPassword", "credit_card", "ssn", "refresh_token"
  const sensitiveKeys = ["password", "token", "access_token", "refresh_token"];

  const filteredData = {};
  Object.keys(data).forEach((key) => {
    if (!sensitiveKeys.includes(key)) {
      filteredData[key] = data[key];
    }
  });
  return filteredData;
}

module.exports = auditLogger;
