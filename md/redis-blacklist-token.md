Bạn có thể sử dụng **Redis** để lưu danh sách các token bị blacklist khi người dùng logout. Dưới đây là cách triển khai:

---

### 🛠 **Các bước thực hiện**

1. **Khi người dùng logout**, lưu token vào Redis với TTL (thời gian hết hạn) bằng với `exp - iat`.
2. **Khi xác thực request**, kiểm tra token có trong blacklist Redis không.
3. **Nếu token bị blacklist**, từ chối truy cập.
4. **Nếu token không có trong blacklist**, tiếp tục xác thực với JWT bình thường.

---

### 🔥 **Cài đặt Redis và thư viện cần thiết**

Nếu bạn chưa cài đặt Redis, chạy lệnh:

```sh
npm install ioredis jsonwebtoken express
```

---

### 🚀 **Triển khai Redis Blacklist cho Token**

#### 1️⃣ **Cấu hình Redis**

```js
const Redis = require("ioredis");
const redis = new Redis(); // Kết nối Redis, có thể thêm { host, port } nếu cần
```

#### 2️⃣ **Middleware kiểm tra token blacklist**

```js
const jwt = require("jsonwebtoken");

const checkBlacklist = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  // Kiểm tra token có trong Redis không
  const isBlacklisted = await redis.get(`blacklist:${token}`);
  if (isBlacklisted) return res.status(403).json({ message: "Token is revoked" });

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // Thay bằng secret thực tế
    req.user = decoded.user; // Lưu thông tin user vào request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
```

#### 3️⃣ **Logout và lưu token vào Redis**

```js
const logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const exp = decoded.exp; // Thời gian hết hạn token
    const ttl = exp - Math.floor(Date.now() / 1000); // TTL = Expiration - Current Time

    if (ttl > 0) {
      await redis.set(`blacklist:${token}`, "true", "EX", ttl); // Lưu vào Redis với TTL
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
```

#### 4️⃣ **Áp dụng middleware vào API**

```js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/protected", checkBlacklist, (req, res) => {
  res.json({ message: "You have access!", user: req.user });
});

app.post("/logout", logout);

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

### 🎯 **Tóm tắt hoạt động**

- Khi **logout**, token sẽ được lưu vào Redis với thời gian sống = `exp - now`.
- Khi **request API**, middleware `checkBlacklist` sẽ kiểm tra token có trong Redis không.
- Nếu token có trong **blacklist**, từ chối request (`403 Forbidden`).
- Nếu token hợp lệ, tiếp tục xác thực với JWT.

---

### 💡 **Ưu điểm của giải pháp**

✅ **Hiệu quả & nhanh chóng**: Redis là bộ nhớ key-value cực nhanh.  
✅ **Không cần thay đổi JWT**: Giữ nguyên hệ thống xác thực hiện tại.  
✅ **Dễ dàng mở rộng**: Có thể áp dụng vào nhiều hệ thống có Redis.

Bạn có thể triển khai cách này vào hệ thống của mình ngay! 🚀
