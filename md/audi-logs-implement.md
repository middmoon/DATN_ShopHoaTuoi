Dưới đây là tổng hợp về hệ thống **Audit Log**, bao gồm triển khai **Audit Log Server**, **Middleware ở Business Server**, và **Worker xử lý ghi log theo cơ chế batch insert**.

---

## **1. Kiến Trúc Tổng Quan**

Hệ thống Audit Log sẽ có **3 thành phần chính**:

1. **Business Server**:

   - Xử lý logic nghiệp vụ chính của hệ thống.
   - Sử dụng middleware để **gửi log** đến **RabbitMQ**.

2. **Audit Log Server**:

   - Một API server riêng để **truy xuất logs** từ database.
   - Cung cấp API cho Admin Dashboard để xem logs.

3. **Worker (Consumer - Log Processor)**:
   - Đọc message từ RabbitMQ.
   - Thực hiện **batch insert** vào database mỗi 5 giây để tối ưu hiệu suất.

---

## **2. Triển Khai Middleware Ở Business Server**

Middleware này sẽ ghi log mỗi khi có request hoàn thành (`res.on("finish")`) và gửi dữ liệu vào **RabbitMQ**.

```javascript
const amqp = require("amqplib");
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
    const logData = {
      user_id: req.user?.id || "unknown",
      action: `${req.method} ${req.path}`.toUpperCase(),
      entity: req.path.split("/")[1],
      entity_id: req.params.id || null,
      request_data: req.body || null,
      response_status: res.statusCode,
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
      created_at: new Date(),
    };

    // Gửi log vào RabbitMQ
    if (channel) {
      channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(logData)), {
        persistent: true, // Đảm bảo message không bị mất
      });
    }
  });

  next();
};

module.exports = auditLogger;
```

👉 **Middleware này sẽ được dùng trong các routes của Business Server như sau:**

```javascript
const express = require("express");
const auditLogger = require("./middlewares/auditLogger");

const app = express();
app.use(express.json());

// Sử dụng middleware auditLogger cho tất cả các routes
app.use(auditLogger);

app.get("/products", (req, res) => {
  res.json({ message: "Danh sách sản phẩm" });
});

app.listen(3000, () => console.log("Business Server chạy trên port 3000"));
```

---

## **3. Triển Khai Worker Xử Lý Batch Insert Logs**

Worker sẽ:

- Nhận log từ **RabbitMQ**.
- Lưu vào **một batch tạm thời**.
- Cứ **5 giây một lần**, **ghi batch** vào database.

```javascript
const amqp = require("amqplib");
const { Sequelize, DataTypes } = require("sequelize");

const QUEUE_NAME = "audit_logs";
let channel;
let logsBuffer = [];

const sequelize = new Sequelize("audit_db", "user", "password", {
  host: "localhost",
  dialect: "mysql",
});

const AuditLog = sequelize.define(
  "AuditLog",
  {
    user_id: DataTypes.STRING,
    action: DataTypes.STRING,
    entity: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    request_data: DataTypes.JSON,
    response_status: DataTypes.INTEGER,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    created_at: DataTypes.DATE,
  },
  { tableName: "audit_logs", timestamps: false }
);

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
      logsBuffer = []; // Xóa buffer sau khi ghi thành công
    } catch (error) {
      console.error("Lỗi ghi logs:", error);
    }
  }
}, 5000);

connectRabbitMQ();
```

---

## **4. Triển Khai Audit Log Server**

Audit Log Server này:

- Cung cấp API cho **Admin Dashboard** để xem logs.
- Kết nối đến **Audit Log Database**.

```javascript
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("audit_db", "user", "password", {
  host: "localhost",
  dialect: "mysql",
});

const AuditLog = sequelize.define(
  "AuditLog",
  {
    user_id: DataTypes.STRING,
    action: DataTypes.STRING,
    entity: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    request_data: DataTypes.JSON,
    response_status: DataTypes.INTEGER,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    created_at: DataTypes.DATE,
  },
  { tableName: "audit_logs", timestamps: false }
);

const app = express();
app.use(express.json());

// API lấy logs có phân trang
app.get("/logs", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const logs = await AuditLog.findAll({ limit: parseInt(limit), offset: parseInt(offset), order: [["created_at", "DESC"]] });

  res.json({ data: logs });
});

// API lọc logs theo hành động
app.get("/logs/filter", async (req, res) => {
  const { action } = req.query;
  const logs = await AuditLog.findAll({ where: { action } });

  res.json({ data: logs });
});

app.listen(4000, () => console.log("Audit Log Server chạy trên port 4000"));
```

---

## **5. Kiến Trúc Lưu Trữ Database**

Hệ thống sẽ có **hai database tách biệt**:

1. **Business Database (`business_db`)** chứa dữ liệu chính (sản phẩm, đơn hàng, user, v.v.).
2. **Audit Log Database (`audit_db`)** chỉ chứa logs, giúp hệ thống business không bị ảnh hưởng khi số lượng logs tăng lớn.

**Bảng `audit_logs` trong `audit_db`:**

```sql
CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255),
    action VARCHAR(255),
    entity VARCHAR(255),
    entity_id INT,
    request_data JSON,
    response_status INT,
    ip_address VARCHAR(255),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## **6. Kết Luận**

✅ **Tách biệt Business Server và Audit Log Server** giúp giảm tải cho database chính.  
✅ **Middleware gửi logs qua RabbitMQ** để không làm chậm request của người dùng.  
✅ **Worker batch insert logs mỗi 5s** giúp tối ưu hiệu suất.  
✅ **Audit Log Server cung cấp API cho Admin Dashboard** để xem logs dễ dàng.

🚀 Với kiến trúc này, hệ thống có thể mở rộng, chịu tải cao mà không làm chậm Business Server!
