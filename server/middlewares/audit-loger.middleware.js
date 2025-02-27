"use strict";
require("dotenv").config();

const amqp = require("amqplib");
const jwt = require("jsonwebtoken");
const QUEUE_NAME = "audit_logs";
let channel;

// Kết nối tới RabbitMQ một lần duy nhất
async function connectRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
}
connectRabbitMQ();

const auditLogger = async (req, res, next) => {
  res.on("finish", async () => {
    let userId = "unknown";

    if (req.cookies.accessToken) {
      try {
        const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        userId = decoded.user._id;
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }

    console.log(req.params);

    const logData = {
      user_id: userId,
      action: `${req.method} ${req.originalUrl}`,
      entity: `${req.originalUrl.split("/")[3]}`,
      entity_id: req.params._id || null,
      request_data: req.body || null,
      response_status: res.statusCode,
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
      created_at: new Date(),
    };
    // Gửi log vào RabbitMQ
    if (channel) {
      channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(logData)), {
        persistent: true,
      });
    }
  });

  next();
};

module.exports = auditLogger;
