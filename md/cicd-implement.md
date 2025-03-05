Tôi sẽ hướng dẫn bạn từng bước để thiết lập **CI/CD Local với PM2 + GitHub Actions + Webhook**, demo trên một ứng dụng **Node.js đơn giản**.

---

## **📌 1. Tạo ứng dụng Node.js đơn giản**

Trước tiên, tạo một ứng dụng **Express.js** đơn giản:

### **🔹 Bước 1: Khởi tạo dự án**

```sh
mkdir myapp && cd myapp
npm init -y
npm install express
```

---

### **🔹 Bước 2: Viết file `app.js`**

Tạo **`app.js`**, ban đầu chỉ có route `/` trả về `"Hello World"`.

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

### **🔹 Bước 3: Cấu hình PM2**

Tạo file **`ecosystem.config.js`**:

```javascript
module.exports = {
  apps: [
    {
      name: "myapp",
      script: "app.js",
      instances: "max",
      exec_mode: "cluster",
      watch: true,
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
```

### **🔹 Bước 4: Chạy ứng dụng với PM2**

```sh
pm2 start ecosystem.config.js
```

> 🌟 **Kiểm tra:** Truy cập `http://localhost:3000/` để xem `"Hello World"`.

---

## **📌 2. Thiết lập Webhook nhận sự kiện từ GitHub**

Chúng ta cần một server Express khác để nhận sự kiện `push` từ GitHub.

### **🔹 Bước 1: Tạo Webhook Server (`webhook.js`)**

Tạo file **`webhook.js`**:

```javascript
const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("🔄 Nhận Webhook từ GitHub:", req.body);

  if (req.body.ref === "refs/heads/main") {
    console.log("🚀 Bắt đầu deploy...");

    exec("git pull origin main && pm2 reload myapp", (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Lỗi deploy:", err);
        return res.sendStatus(500);
      }
      console.log("✅ Deploy thành công:", stdout);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

app.listen(3001, () => console.log("🌍 Webhook server chạy trên cổng 3001"));
```

### **🔹 Bước 2: Chạy Webhook Server với PM2**

```sh
pm2 start webhook.js --name webhook
```

---

## **📌 3. Thiết lập GitHub Actions**

Tạo file **`.github/workflows/deploy.yml`** để tự động gửi Webhook khi `push` code lên GitHub.

### **🔹 Bước 1: Tạo file CI/CD**

```yaml
name: Deploy Local

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Gửi Webhook về Server Local
        run: |
          curl -X POST http://your-local-ip:3001/webhook -H "Content-Type: application/json" -d '{}'
```

> **🔹 Thay `your-local-ip` bằng IP local của bạn.**

---

## **📌 4. Commit & Push lên GitHub**

Thêm tất cả file vào Git:

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

> **🔹 Sau khi push, GitHub Actions sẽ gọi Webhook để pull code + restart bằng PM2.**

---

## **📌 5. Cập nhật Route `/hello/:name` và kiểm tra CI/CD**

Bây giờ, cập nhật **`app.js`** để thêm route mới:

```javascript
app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});
```

### **🔹 Commit & Push lại**

```sh
git add app.js
git commit -m "Add dynamic route /hello/:name"
git push origin main
```

> **GitHub Actions sẽ tự động deploy, bạn chỉ cần F5 lại trang web!** 🚀

---

## **📌 Kết quả mong đợi**

✅ **Trước khi update**: `GET /` → `"Hello World"`  
✅ **Sau khi update**: `GET /hello/Alice` → `"Hello Alice"`  
✅ **CI/CD hoạt động**: Không cần restart, code tự cập nhật 🎯

---

## **🎯 Tổng kết**

🔹 **PM2 quản lý Zero-Downtime Deployment**  
🔹 **Webhook giúp Local Server nhận sự kiện từ GitHub**  
🔹 **GitHub Actions tự động gọi Webhook khi push code**  
🔹 **CI/CD hoàn chỉnh mà không tốn chi phí!**

Bạn thử triển khai và kiểm tra xem có lỗi gì không nhé! 🚀🔥
