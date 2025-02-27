Bạn có thể sử dụng **Redis** để cache danh sách sản phẩm (`GET /api/v1/product`) nhằm giảm tải cho database và tăng tốc độ phản hồi API.

---

## 🛠 **Cách triển khai cache dữ liệu với Redis**

1. **Khi có request GET `/api/v1/product`**, kiểm tra Redis:
   - Nếu **có cache**, trả về dữ liệu từ Redis.
   - Nếu **chưa có cache**, truy vấn database, lưu vào Redis và đặt TTL.
2. **Khi sản phẩm thay đổi (thêm/sửa/xóa)**, xóa cache để dữ liệu luôn chính xác.

---

### 🚀 **Cài đặt Redis Cache trong Express**

#### **1️⃣ Cài đặt Redis & thư viện cần thiết**

```sh
npm install ioredis express mongoose
```

#### **2️⃣ Kết nối Redis**

```js
const Redis = require("ioredis");
const redis = new Redis(); // Kết nối Redis
```

#### **3️⃣ Middleware kiểm tra cache**

```js
const cacheMiddleware = async (req, res, next) => {
  const cacheData = await redis.get("product_list");
  if (cacheData) {
    return res.json(JSON.parse(cacheData)); // Trả về dữ liệu từ Redis
  }
  next();
};
```

#### **4️⃣ API lấy danh sách sản phẩm có cache**

```js
const express = require("express");
const mongoose = require("mongoose");

const Product = mongoose.model("Product", new mongoose.Schema({ name: String, price: Number }));

const app = express();
app.use(express.json());

// Lấy danh sách sản phẩm với cache
app.get("/api/v1/product", cacheMiddleware, async (req, res) => {
  const products = await Product.find(); // Truy vấn database
  await redis.set("product_list", JSON.stringify(products), "EX", 3600); // Cache 1 giờ
  res.json(products);
});
```

#### **5️⃣ Xóa cache khi sản phẩm thay đổi**

```js
app.post("/api/v1/product", async (req, res) => {
  const newProduct = await Product.create(req.body);
  await redis.del("product_list"); // Xóa cache khi có sản phẩm mới
  res.status(201).json(newProduct);
});

app.put("/api/v1/product/:id", async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  await redis.del("product_list"); // Xóa cache khi cập nhật sản phẩm
  res.json(updatedProduct);
});

app.delete("/api/v1/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  await redis.del("product_list"); // Xóa cache khi xóa sản phẩm
  res.status(204).send();
});
```

---

## 🎯 **Tóm tắt hoạt động**

1. **GET /api/v1/product**:

   - Kiểm tra Redis cache.
   - Nếu có cache, trả về ngay lập tức.
   - Nếu không có, truy vấn database rồi lưu vào Redis.

2. **POST/PUT/DELETE sản phẩm**:
   - Xóa cache `product_list` để đảm bảo dữ liệu không bị cũ.

---

## 💡 **Lợi ích khi sử dụng Redis cache**

✅ **Tăng tốc độ phản hồi**: API nhanh hơn do không phải truy vấn DB.  
✅ **Giảm tải database**: Hạn chế truy vấn không cần thiết.  
✅ **Dễ mở rộng**: Redis hỗ trợ phân tán, mở rộng dễ dàng.

Đây là cách tối ưu hiệu suất hệ thống mà bạn có thể áp dụng ngay! 🚀
