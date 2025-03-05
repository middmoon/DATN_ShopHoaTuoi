### 📌 **Vấn đề chính**

1. **Middleware `getResData` không bắt được dữ liệu**

   - Đang dùng `res.send` để lấy dữ liệu (`req.resData = body`), nhưng **controller `ProductController.getProducts` lại dùng `res.json()` thay vì `res.send()`**.
   - Trong Express, `res.json(data)` là một wrapper của `res.send()`, nhưng khi bạn ghi đè `res.send`, **`res.json()` vẫn có thể bỏ qua `getResData`**.
   - **Kết quả:** `req.resData` có thể bị `undefined`, làm cho `searchLogger` không lấy được dữ liệu.

2. **Thứ tự Middleware & `searchLogger` chạy `res.on("finish")`**
   - **`searchLogger` chỉ chạy sau khi response đã hoàn thành (`res.on("finish")`)**.
   - Nếu **middleware trước đó đã xử lý sai `res.json` hoặc `res.send`**, `req.resData` sẽ không tồn tại.
   - **Kết quả:** `searchLogger` không lấy được `req.resData`, dẫn đến **log trống hoặc lỗi JSON.parse**.

---

### 🛠 **Giải pháp**

Cần đảm bảo **bắt đúng dữ liệu từ `res.json()`**, và **sửa `searchLogger` để lấy data chính xác**.

#### ✅ **Sửa `getResData` để hỗ trợ cả `res.json()`**

```js
const getResData = (req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    req.resData = JSON.stringify(data); // Lưu lại response data cho các middleware sau
    return oldJson.call(res, data);
  };

  next();
};
```

🔥 **Lưu ý:**

- Sử dụng `JSON.stringify(data)` để tránh lỗi khi `searchLogger` gọi `JSON.parse(req.resData)`.

---

#### ✅ **Sửa `searchLogger` để xử lý dữ liệu chính xác**

```js
const searchLogger = async (req, res, next) => {
  res.on("finish", async () => {
    let userId = null;
    let data = [];

    // Kiểm tra nếu req.resData tồn tại và hợp lệ
    if (req.resData) {
      try {
        const parsedData = JSON.parse(req.resData); // Chuyển JSON string về object
        if (parsedData.data && Array.isArray(parsedData.data)) {
          data = parsedData.data;
        }
      } catch (error) {
        console.error("Failed to parse response data:", error);
      }
    }

    if (req.cookies.accessToken) {
      try {
        const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
        userId = decoded.user._id;
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }

    let product_list_ids = data.map((p) => p._id);

    const logData = {
      user_id: userId,
      search_query: req.query,
      product_results: product_list_ids,
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
```

🔥 **Điểm cải tiến:**

- **Kiểm tra kỹ `req.resData` trước khi `JSON.parse()`** tránh lỗi `undefined`.
- **Đảm bảo `data` luôn là mảng** trước khi `map((p) => p._id)`.

---

#### ✅ **Sửa `cacheMiddleware` để không ảnh hưởng đến `res.json()`**

```js
const cacheMiddleware = async (req, res, next) => {
  try {
    const cacheKey = req.originalUrl;
    const cacheData = await redis.get(cacheKey);

    if (cacheData) {
      console.log("🟢 Cache hit! Trả về dữ liệu từ Redis");
      return res.json(JSON.parse(cacheData));
    }

    // Ghi đè res.json để cache dữ liệu đúng cách
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redis.set(cacheKey, JSON.stringify(data), "EX", 3600);
      console.log("Caching data for URL:", cacheKey);

      originalJson(data); // Gửi response về client
    };

    next();
  } catch (error) {
    console.error("Cache error:", error);
    next();
  }
};
```

🔥 **Điểm cải tiến:**

- Giữ nguyên logic caching mà không làm ảnh hưởng đến các middleware sau.

---

### ✅ **Tóm tắt Fix**

1. **Ghi đè `res.json()` trong `getResData`** → đảm bảo lấy được dữ liệu.
2. **Cập nhật `searchLogger` để tránh lỗi `JSON.parse(req.resData)`**.
3. **Giữ nguyên logic `cacheMiddleware` nhưng không phá vỡ middleware khác**.

---

### 🚀 **Sau khi fix, thứ tự middleware sẽ hoạt động đúng**

```js
route.get("/", cacheMiddleware, getResData, searchLogger, asyncHandler(ProductController.getProducts));
```

1️⃣ **`cacheMiddleware`**: Kiểm tra cache Redis → nếu có, trả về ngay.  
2️⃣ **`getResData`**: Ghi đè `res.json()` để lưu dữ liệu vào `req.resData`.  
3️⃣ **`searchLogger`**: Khi response hoàn thành (`res.on("finish")`), lấy `req.resData` để ghi log.  
4️⃣ **`ProductController.getProducts`**: Truy vấn DB nếu không có cache.

💯 **Kết quả:**

- **Dữ liệu được cache đúng cách.**
- **Dữ liệu trả về client & log tìm kiếm đều chính xác.** 🚀
