"use strict";

const amqp = require("amqplib");

const QUEUE_NAMES = {
  AUDIT_LOGS: "audit_logs",
  SEARCH_LOGS: "search_logs",
};

const channels = {};

const connectRabbitMQ = async function () {
  try {
    const connection = await amqp.connect(process.env.MQ_HOST);

    for (const queueName of Object.values(QUEUE_NAMES)) {
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName, { durable: true });
      channels[queueName] = channel;
      console.log(`Channel and queue ${queueName} asserted`);
    }

    connection.on("error", (err) => {
      console.error("RabbitMQ connection error:", err);
    });
    connection.on("close", () => {
      console.log("RabbitMQ connection closed");
      for (const queueName of Object.values(QUEUE_NAMES)) {
        channels[queueName] = null;
      }
    });

    return channels;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    throw error;
  }
};

const getChannel = (queueName) => {
  if (!Object.values(QUEUE_NAMES).includes(queueName)) {
    throw new Error(`Unknown queue name: ${queueName}`);
  }
  return channels[queueName];
};

module.exports = {
  connectRabbitMQ,
  getChannel,
  QUEUE_NAMES,
};
