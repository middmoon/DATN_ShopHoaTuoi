const amqp = require("amqplib");
const db = require("./models"); // Kết nối Sequelize
const { AuditLog } = require("./models");

const QUEUE_NAME = "audit_logs";
let channel;
let logsBuffer = [];

async function connectRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg) {
      const log = JSON.parse(msg.content.toString());
      logsBuffer.push(log);
      channel.ack(msg);
    }
  });

  console.log("Worker đã kết nối và đang lắng nghe log...");
}

// Batch insert mỗi 5 giây
setInterval(async () => {
  if (logsBuffer.length > 0) {
    try {
      await AuditLog.bulkCreate(logsBuffer);
      console.log(`Ghi ${logsBuffer.length} logs vào DB.`);
      logsBuffer = [];
    } catch (error) {
      console.error("Lỗi ghi logs:", error);
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
