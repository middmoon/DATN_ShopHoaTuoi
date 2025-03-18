### Hướng dẫn sử dụng **Nodemailer** để gửi email trong Node.js 🚀

#### 1. **Cài đặt Nodemailer**

Trước tiên, bạn cần cài đặt **Nodemailer** bằng npm hoặc yarn:

```sh
npm install nodemailer
```

hoặc:

```sh
yarn add nodemailer
```

---

### 2. **Cấu hình và gửi email với Gmail**

Dưới đây là cách sử dụng Nodemailer để gửi email qua **Gmail**:

```js
const nodemailer = require("nodemailer");

// Cấu hình transporter với tài khoản Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // Thay bằng email của bạn
    pass: "your-app-password", // Thay bằng mật khẩu ứng dụng (không phải mật khẩu tài khoản)
  },
});

// Hàm gửi email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "your-email@gmail.com", // Email gửi
      to, // Email nhận
      subject, // Chủ đề email
      text, // Nội dung email dạng text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Gửi email
sendEmail("receiver@example.com", "Chào bạn!", "Đây là nội dung email.");
```

---

### 3. **Sử dụng mật khẩu ứng dụng thay vì mật khẩu Gmail**

Nếu bạn dùng Gmail, Google không cho phép đăng nhập trực tiếp bằng mật khẩu tài khoản. Bạn cần tạo **App Password**:

1. Truy cập: [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Chọn "Mail" → "Device" (ví dụ: "My App") → Nhấn "Generate"
3. Copy mật khẩu và dùng thay cho `pass` trong code trên.

---

### 4. **Gửi email HTML & đính kèm file**

Bạn có thể gửi email với nội dung **HTML** và file đính kèm:

```js
const mailOptions = {
  from: "your-email@gmail.com",
  to: "receiver@example.com",
  subject: "Email với HTML và File",
  html: "<h1>Xin chào!</h1><p>Đây là nội dung HTML</p>",
  attachments: [
    {
      filename: "file.txt",
      path: "./file.txt",
    },
  ],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
```

---

### 5. **Sử dụng SMTP Server**

Nếu không dùng Gmail, bạn có thể dùng SMTP Server khác:

```js
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 465, // Hoặc 587
  secure: true, // true nếu dùng SSL/TLS
  auth: {
    user: "your-email@example.com",
    pass: "your-password",
  },
});
```

---

### 6. **Xử lý lỗi khi gửi email**

Bạn nên thêm `try...catch` để bắt lỗi:

```js
try {
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: ", info.messageId);
} catch (error) {
  console.error("Lỗi gửi email:", error);
}
```

---

### **Kết luận**

- **Nodemailer** là thư viện mạnh mẽ giúp gửi email trong Node.js.
- Nếu dùng **Gmail**, hãy sử dụng **App Password**.
- Có thể gửi email dạng **text, HTML**, đính kèm **file**.
- Hỗ trợ **SMTP Server** tùy chỉnh.

Cần hỗ trợ thêm? Cứ hỏi mình nhé! 🚀
