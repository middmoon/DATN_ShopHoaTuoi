Tôi sẽ giải thích chi tiết về **data pipeline** trong API dựa trên mã nguồn bạn cung cấp. Data pipeline này là một chuỗi các bước xử lý yêu cầu từ người dùng, bao gồm các middleware và controller, được thiết kế để lấy dữ liệu, xử lý, tối ưu hóa hiệu suất và ghi log. Dưới đây là phân tích từng bước trong luồng dữ liệu:

---

## **Tổng quan về pipeline**

API của bạn xử lý yêu cầu GET đến endpoint `/` thông qua một chuỗi các middleware và controller theo thứ tự sau:

1. **`getResData`**: Gắn dữ liệu phản hồi vào `req.resData` để các middleware sau có thể truy cập.
2. **`searchLogger`**: Ghi log hoạt động tìm kiếm sau khi phản hồi được gửi.
3. **`cacheMiddleware`**: Kiểm tra và sử dụng cache để tối ưu hóa hiệu suất.
4. **`ProductController.getProducts`**: Xử lý logic chính để lấy danh sách sản phẩm và trả về phản hồi.

Dưới đây là chi tiết cách dữ liệu chảy qua từng thành phần này.

---

## **1. Middleware `getResData`**

### **Chức năng**

Middleware này ghi đè phương thức `res.send` để lưu trữ dữ liệu phản hồi (`body`) vào `req.resData` trước khi gửi phản hồi thực sự đến người dùng.

### **Mã nguồn**

```javascript
const getResData = (req, res, next) => {
  const oldSend = res.send;
  res.send = function (body) {
    req.resData = body; // Lưu dữ liệu phản hồi vào req.resData
    return oldSend.call(res, body); // Gọi res.send gốc để gửi phản hồi
  };
  next();
};
```

### **Cách hoạt động**

- **Bước 1**: Lưu trữ phương thức `res.send` gốc vào biến `oldSend`.
- **Bước 2**: Ghi đè `res.send` bằng một hàm mới:
  - Gán `body` (dữ liệu phản hồi) vào `req.resData`.
  - Gọi `oldSend` để gửi phản hồi như bình thường.
- **Bước 3**: Gọi `next()` để chuyển yêu cầu sang middleware tiếp theo.

### **Mục đích**

- Cho phép các middleware hoặc logic sau truy cập dữ liệu phản hồi (`req.resData`) mà không cần thay đổi logic chính trong controller.
- Ví dụ: Middleware `searchLogger` sau này sẽ sử dụng `req.resData` để ghi log.

---

## **2. Middleware `searchLogger`**

### **Chức năng**

Middleware này ghi log các hoạt động tìm kiếm vào hàng đợi RabbitMQ sau khi phản hồi đã được gửi đến người dùng.

### **Mã nguồn (tóm tắt)**

```javascript
const searchLogger = async (req, res, next) => {
  res.on("finish", async () => {
    let userId = null;
    const data = JSON.parse(req.resData).data;

    if (req.cookies.accessToken) {
      const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
      userId = decoded.user._id;
    }

    const product_list_ids = data.length > 0 ? data.map((p) => p._id) : [];
    const logData = {
      user_id: userId,
      search_query: req.query,
      product_results: product_list_ids,
      ip_address: req.ip,
    };

    const channel = getChannel(QUEUE_NAMES.SEARCH_LOGS);
    if (channel) {
      channel.sendToQueue(QUEUE_NAMES.SEARCH_LOGS, Buffer.from(JSON.stringify(logData)), { persistent: true });
    }
  });
  next();
};
```

### **Cách hoạt động**

- **Bước 1**: Đăng ký sự kiện `finish` trên `res` để thực thi logic sau khi phản hồi đã được gửi.
- **Bước 2**: Trong hàm callback của sự kiện `finish`:
  - Lấy `userId` từ token JWT (nếu có) trong `req.cookies.accessToken`.
  - Trích xuất danh sách `product_list_ids` từ `req.resData` (dữ liệu phản hồi đã được lưu bởi `getResData`).
  - Tạo đối tượng `logData` chứa thông tin:
    - `user_id`: ID của người dùng (nếu có).
    - `search_query`: Tham số truy vấn từ `req.query`.
    - `product_results`: Danh sách ID sản phẩm trả về.
    - `ip_address`: Địa chỉ IP của người dùng.
  - Gửi `logData` đến hàng đợi RabbitMQ (`search_logs`) nếu kết nối RabbitMQ khả dụng.
- **Bước 3**: Gọi `next()` để tiếp tục pipeline.

### **Mục đích**

- Ghi log hoạt động tìm kiếm để theo dõi và phân tích sau này.
- Sử dụng sự kiện `finish` đảm bảo việc ghi log không làm chậm thời gian phản hồi cho người dùng.

---

## **3. Middleware `cacheMiddleware`**

### **Chức năng**

Middleware này kiểm tra và sử dụng cache để tăng tốc độ phản hồi, đồng thời lưu trữ dữ liệu vào cache nếu đáp ứng điều kiện.

### **Mã nguồn (tóm tắt)**

```javascript
const cacheMiddleware = async (req, res, next) => {
  const cacheKey = `product:search:${req.originalUrl}`;
  const cacheData = await redis.get(cacheKey);

  if (cacheData) {
    return new OK({
      message: "Product retrieved successfully by cache",
      data: JSON.parse(cacheData).data,
    }).send(res);
  }

  const originalJson = res.json.bind(res);
  res.json = async (data) => {
    if (data.status === 200 && Array.isArray(data.data) && data.data.length > 10) {
      await redis.set(cacheKey, JSON.stringify(data), "EX", 600); // Cache 10 phút
    }
    originalJson(data);
  };

  next();
};
```

### **Cách hoạt động**

- **Bước 1**: Tạo `cacheKey` dựa trên URL của yêu cầu (`req.originalUrl`).
- **Bước 2**: Kiểm tra cache trong Redis:
  - Nếu có dữ liệu trong cache:
    - Trả về dữ liệu từ cache và kết thúc chuỗi middleware (không gọi `next()`).
  - Nếu không có cache:
    - Ghi đè phương thức `res.json` để sau khi controller xử lý:
      - Kiểm tra nếu phản hồi hợp lệ (`status === 200`), dữ liệu là mảng và có hơn 10 sản phẩm.
      - Lưu dữ liệu vào cache với TTL (time-to-live) 10 phút (600 giây).
    - Gọi `next()` để tiếp tục pipeline.

### **Mục đích**

- Giảm tải cho database bằng cách trả về dữ liệu từ cache cho các yêu cầu phổ biến.
- Tăng tốc độ phản hồi cho người dùng.
- Chỉ cache các phản hồi có số lượng sản phẩm lớn (>10) để tối ưu hóa tài nguyên.

---

## **4. Controller `ProductController.getProducts`**

### **Chức năng**

Controller này xử lý logic chính để lấy danh sách sản phẩm dựa trên các tham số truy vấn từ người dùng.

### **Mã nguồn (tóm tắt)**

```javascript
static getProducts = async (req, res) => {
  const isManageRoute = req.originalUrl.includes("/manage");

  if (!isManageRoute) {
    req.query.is_public = true; // Chỉ lấy sản phẩm công khai
  }

  const queryOptions = buildQueryOptions(req.query);
  new OK({
    message: "Products retrieved successfully",
    data: await ProductService.getProductsTEST(queryOptions),
  }).send(res);
};
```

### **Cách hoạt động**

- **Bước 1**: Kiểm tra xem yêu cầu có đến từ route quản lý (`/manage`) không.
- **Bước 2**: Nếu không phải route quản lý, thêm điều kiện `is_public: true` vào truy vấn để chỉ lấy sản phẩm công khai.
- **Bước 3**: Xây dựng `queryOptions` từ `req.query` (các tham số truy vấn của người dùng).
- **Bước 4**: Gọi `ProductService.getProductsTEST` để lấy danh sách sản phẩm từ database.
- **Bước 5**: Trả về phản hồi với dữ liệu sản phẩm bằng phương thức `send` của lớp `OK`.

### **Mục đích**

- Cung cấp dữ liệu sản phẩm cho người dùng hoặc quản trị viên dựa trên các tham số truy vấn.
- Đảm bảo logic kinh doanh chính được xử lý tại đây.

---

## **Luồng dữ liệu qua pipeline**

Dưới đây là cách dữ liệu chảy qua pipeline từ khi nhận yêu cầu đến khi trả về phản hồi:

1. **Yêu cầu đến API**: Người dùng gửi yêu cầu GET đến `/` với các tham số truy vấn (ví dụ: `GET /?q=phone`).
2. **`getResData`**:
   - Ghi đè `res.send` để lưu dữ liệu phản hồi vào `req.resData`.
3. **`searchLogger`**:
   - Đăng ký sự kiện `finish` để ghi log sau khi phản hồi được gửi.
4. **`cacheMiddleware`**:
   - Tạo `cacheKey` (ví dụ: `product:search:/?q=phone`).
   - Kiểm tra cache:
     - Nếu có cache, trả về dữ liệu cache và kết thúc.
     - Nếu không, ghi đè `res.json` để cache dữ liệu sau khi controller xử lý, rồi gọi `next()`.
5. **`ProductController.getProducts`**:
   - Xác định route (quản lý hay công khai).
   - Xây dựng `queryOptions` từ `req.query`.
   - Lấy dữ liệu từ `ProductService`.
   - Gửi phản hồi với dữ liệu sản phẩm (gọi `res.send` đã được ghi đè bởi `getResData`).
6. **Sau khi controller xử lý**:
   - `cacheMiddleware`: Nếu số lượng sản phẩm > 10, lưu dữ liệu vào Redis.
   - `searchLogger`: Gửi log đến RabbitMQ sau khi sự kiện `finish` được kích hoạt.

---

## **Tóm tắt vai trò của từng thành phần**

- **`getResData`**: Chuẩn bị dữ liệu phản hồi để các middleware sau truy cập.
- **`searchLogger`**: Ghi log hoạt động tìm kiếm một cách bất đồng bộ, không ảnh hưởng đến thời gian phản hồi.
- **`cacheMiddleware`**: Tối ưu hóa hiệu suất bằng cách sử dụng cache cho các yêu cầu phổ biến.
- **`ProductController.getProducts`**: Xử lý logic chính để lấy và trả về dữ liệu sản phẩm.

Pipeline này được thiết kế để:

- **Hiệu quả**: Sử dụng cache để giảm tải database.
- **Tối ưu thời gian phản hồi**: Ghi log sau khi gửi phản hồi.
- **Dễ bảo trì**: Tách biệt các chức năng (lấy dữ liệu, cache, log) thành các middleware riêng biệt.

Hy vọng giải thích này giúp bạn hiểu rõ cách dữ liệu chảy qua API của mình! Nếu bạn cần thêm chi tiết, hãy cho tôi biết nhé.
