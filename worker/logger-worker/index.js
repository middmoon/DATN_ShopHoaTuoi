const amqp = require("amqplib");
const db = require("./models"); // Sequelize instance
const { AuditLog, SearchLog } = require("./models");

const QUEUE_NAMES = {
  AUDIT_LOGS: "audit_logs",
  SEARCH_LOGS: "search_logs",
};

let channel;
let auditLogsBuffer = [];
let searchLogsBuffer = [];

async function connectRabbitMQ() {
  try {
    // env MQ_HOST
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    // Assert queues
    await channel.assertQueue(QUEUE_NAMES.AUDIT_LOGS, { durable: true });
    await channel.assertQueue(QUEUE_NAMES.SEARCH_LOGS, { durable: true });

    // Consume from audit_logs
    channel.consume(QUEUE_NAMES.AUDIT_LOGS, async (msg) => {
      if (msg) {
        const log = JSON.parse(msg.content.toString());
        auditLogsBuffer.push(log);
        channel.ack(msg);
      }
    });

    // Consume from search_logs
    channel.consume(QUEUE_NAMES.SEARCH_LOGS, async (msg) => {
      if (msg) {
        const log = JSON.parse(msg.content.toString());
        searchLogsBuffer.push(log);
        channel.ack(msg);
      }
    });

    console.log("Worker đã kết nối và đang lắng nghe log...");
  } catch (error) {
    console.error("Lỗi kết nối RabbitMQ:", error);
    process.exit(1);
  }
}

setInterval(async () => {
  if (auditLogsBuffer.length > 0) {
    try {
      await AuditLog.bulkCreate(auditLogsBuffer);
      console.log(`Ghi ${auditLogsBuffer.length} audit logs vào DB.`);
      auditLogsBuffer = [];
    } catch (error) {
      console.error("Lỗi ghi audit logs:", error);
    }
  }

  if (searchLogsBuffer.length > 0) {
    try {
      await SearchLog.bulkCreate(searchLogsBuffer);
      console.log(`Ghi ${searchLogsBuffer.length} search logs vào DB.`);
      searchLogsBuffer = [];
    } catch (error) {
      console.error("Lỗi ghi search logs:", error);
    }
  }
}, 5000);

(async () => {
  try {
    await db.sequelize
      .authenticate()
      .then(() => {
        if (process.env.NODE_ENV !== "production") {
          const { host, port, database } = db.sequelize.config;

          console.log(`Connection established successfully.`);
          console.log(`Host: ${host}`);
          console.log(`Port: ${port}`);
          console.log(`Database: ${database}`);
        }
      })
      .then(() => {
        console.log("✅ Database connected successfully!");
      })
      .then(() => {
        connectRabbitMQ();
      });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
})();
