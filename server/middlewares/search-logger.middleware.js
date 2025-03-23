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

const searchLogger = async (req, res, next) => {
  res.on("finish", async () => {
    let userId = null;
    const data = JSON.parse(req.resData).data;

    if (!data) next();

    // console.log(data);

    if (req.cookies.accessToken) {
      try {
        const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        userId = decoded.user._id;
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }

    let product_list_ids = [];

    if (data.length > 0) {
      product_list_ids = data.map((p) => p._id);
    }

    const logData = {
      user_id: userId,
      search_query: req.query,
      product_results: product_list_ids,
      ip_address: req.ip,
    };

    const channel = getChannel(QUEUE_NAMES.SEARCH_LOGS);
    if (channel) {
      try {
        channel.sendToQueue(QUEUE_NAMES.SEARCH_LOGS, Buffer.from(JSON.stringify(logData)), { persistent: true });
        console.log("Search log sent to RabbitMQ:", logData.search_query);
      } catch (error) {
        console.error("Failed to send search log:", error);
      }
    } else {
      console.warn("RabbitMQ channel not available for search_logs, log not sent:", logData);
    }
  });

  next();
};

module.exports = searchLogger;
