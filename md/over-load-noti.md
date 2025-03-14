Dưới đây là hướng dẫn cụ thể để gửi tin nhắn từ Socket.IO đến Telegram:

---

## **1. Tạo Bot Telegram**

Trước tiên, bạn cần tạo một bot trên Telegram.

1. **Mở Telegram và tìm bot** `@BotFather`.
2. **Gửi lệnh** `/newbot` để tạo bot mới.
3. **Nhập tên bot** (VD: `MyNotificationBot`).
4. **Nhập username bot** (VD: `MyNotifBot`).
5. Sau khi tạo xong, **BotFather sẽ cung cấp cho bạn một `TOKEN`**, lưu lại token này.

---

## **2. Lấy ID của người nhận (Chat ID)**

Có hai cách lấy `chat_id` của bạn hoặc nhóm chat:

### **Cách 1: Lấy Chat ID cá nhân**

1. Vào Telegram, tìm bot `@userinfobot`.
2. Nhấn **Start**, bot sẽ hiển thị `chat_id` của bạn.

### **Cách 2: Lấy Chat ID nhóm (nếu gửi tin nhắn vào nhóm)**

1. **Thêm bot vào nhóm Telegram**.
2. **Gửi tin nhắn bất kỳ** trong nhóm.
3. Truy cập API:
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
   Thay `<TOKEN>` bằng token bot của bạn, sau đó tìm `chat.id` trong phản hồi JSON.

---

## **3. Cài đặt Socket.IO và Axios**

Chạy lệnh:

```sh
npm install express socket.io axios
```

---

## **4. Viết Server Node.js**

Tạo file `server.js` và dán đoạn mã sau:

```javascript
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Thay thế bằng token bot của bạn và chat_id của người nhận
const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";

// Hàm gửi tin nhắn đến Telegram
const sendMessageToTelegram = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
    console.log("Sent to Telegram:", response.data);
  } catch (error) {
    console.error("Error sending message to Telegram:", error.response.data);
  }
};

// Lắng nghe sự kiện từ Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Received message:", data.message);
    sendMessageToTelegram(data.message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## **5. Viết Client HTML**

Tạo file `index.html` để gửi tin nhắn từ trình duyệt.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Socket.IO to Telegram</title>
    <script src="https://cdn.socket.io/4.0.1/socket.io.min.js"></script>
  </head>
  <body>
    <h1>Gửi tin nhắn đến Telegram</h1>
    <input type="text" id="messageInput" placeholder="Nhập tin nhắn..." />
    <button onclick="sendMessage()">Gửi</button>

    <script>
      const socket = io("http://localhost:3000");

      function sendMessage() {
        const message = document.getElementById("messageInput").value;
        socket.emit("send_message", { message });
      }
    </script>
  </body>
</html>
```

---

## **6. Chạy Server và Kiểm tra**

1. Chạy server:

   ```sh
   node server.js
   ```

   Nếu chạy thành công, bạn sẽ thấy:

   ```
   Server running on http://localhost:3000
   ```

2. Mở `index.html` trong trình duyệt.
3. Nhập tin nhắn và nhấn **"Gửi"**.
4. Tin nhắn sẽ được gửi đến Telegram của bạn.

---

## **Kết quả**

- Khi bạn nhập tin nhắn trong giao diện web, nó sẽ được gửi qua Socket.IO.
- Server nhận tin nhắn và gửi đến Telegram Bot API.
- Bạn sẽ nhận được tin nhắn từ bot trên Telegram.

Bạn có thể áp dụng cách này để gửi thông báo từ hệ thống của mình (VD: cảnh báo hệ thống, báo lỗi server, v.v.). 🚀

Bạn có thể kết hợp **PM2**, **Socket.IO**, và **Telegram Bot** để gửi thông báo khi CPU sử dụng vượt quá 50%. PM2 cung cấp API để lấy thông tin CPU sử dụng, và khi vượt ngưỡng, nó sẽ gửi thông báo qua Telegram.

---

## **1. Cài đặt PM2 và Các Thư Viện Cần Thiết**

Chạy lệnh sau:

```sh
npm install pm2 axios socket.io express
```

Nếu chưa cài **PM2**, hãy cài đặt toàn cục:

```sh
npm install -g pm2
```

---

## **2. Tạo File `server.js` để Giám Sát CPU và Gửi Thông Báo**

Tạo file `server.js` với nội dung sau:

```javascript
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const pm2 = require("pm2");
const os = require("os");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // Token của bot Telegram
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"; // Chat ID của bạn

// Hàm gửi tin nhắn đến Telegram
const sendMessageToTelegram = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
    console.log("Sent to Telegram:", message);
  } catch (error) {
    console.error("Error sending message to Telegram:", error.response?.data || error.message);
  }
};

// Lắng nghe sự kiện từ Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Received message:", data.message);
    sendMessageToTelegram(data.message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Kiểm tra CPU Usage mỗi 10 giây
setInterval(() => {
  pm2.list((err, processList) => {
    if (err) {
      console.error("Error fetching PM2 process list:", err);
      return;
    }

    processList.forEach((proc) => {
      const cpuUsage = proc.monit.cpu; // Lấy % CPU đang sử dụng
      if (cpuUsage > 50) {
        const message = `⚠️ CẢNH BÁO: Server đang quá tải!\nỨng dụng: ${proc.name}\nCPU: ${cpuUsage}%`;
        sendMessageToTelegram(message);
      }
    });
  });
}, 10000); // 10 giây kiểm tra một lần

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## **3. Chạy Server Bằng PM2**

### **Khởi động server với PM2**

```sh
pm2 start server.js --name my-app
```

### **Lưu cấu hình để khởi động lại sau khi reboot**

```sh
pm2 save
pm2 startup
```

### **Xem CPU sử dụng theo thời gian thực**

```sh
pm2 monit
```

---

## **4. Kiểm Tra Hoạt Động**

- Server sẽ giám sát CPU sử dụng của các process PM2.
- Nếu CPU của bất kỳ process nào vượt quá **50%**, nó sẽ gửi thông báo qua Telegram.
- Bạn có thể kiểm tra log bằng:
  ```sh
  pm2 logs
  ```

### **Test tải CPU để kích hoạt cảnh báo**

Bạn có thể tạo một đoạn code tiêu tốn CPU để test:

```sh
while true; do :; done
```

Hoặc trong Node.js:

```javascript
while (true) {
  Math.sqrt(Math.random() * 1000000);
}
```

Nếu CPU vượt 50%, bạn sẽ nhận được tin nhắn trên Telegram.

---

## **Kết Luận**

Bạn đã tích hợp thành công **PM2** để giám sát CPU và gửi cảnh báo qua **Telegram** khi vượt quá **50%**. 🚀

Chúc bạn thành công! 🎯
