Trong **Sequelize**, bạn có thể tạo nhiều loại **indexes** để tối ưu hiệu suất truy vấn. Dưới đây là **các loại index phổ biến** mà bạn có thể sử dụng:

---

### **1️⃣ B-TREE INDEX (Mặc định)**

📌 **Loại index mặc định của MySQL, PostgreSQL và hầu hết các database quan hệ**  
✅ **Tăng tốc truy vấn với WHERE, ORDER BY, GROUP BY**

🔹 **Cách sử dụng:**

```js
indexes: [
  {
    name: "idx_product_name",
    fields: ["name"], // Đánh index trên cột 'name'
  },
],
```

🔹 **Tương đương SQL:**

```sql
CREATE INDEX idx_product_name ON products(name);
```

---

### **2️⃣ UNIQUE INDEX**

📌 **Dùng để đảm bảo giá trị trong cột là duy nhất**  
✅ **Tốt cho các cột như email, username, slug**

🔹 **Cách sử dụng:**

```js
indexes: [
  {
    name: "idx_unique_slug",
    unique: true,
    fields: ["slug"], // Không cho phép trùng slug
  },
],
```

🔹 **Tương đương SQL:**

```sql
CREATE UNIQUE INDEX idx_unique_slug ON products(slug);
```

---

### **3️⃣ FULLTEXT INDEX**

📌 **Tối ưu tìm kiếm văn bản (text search) trong MySQL & MariaDB**  
✅ **Tìm kiếm nhanh hơn khi dùng `MATCH() AGAINST()` thay vì LIKE**

🔹 **Cách sử dụng:**

```js
indexes: [
  {
    type: "FULLTEXT",
    name: "fulltext_name_desc_slug",
    fields: ["name", "description", "slug"],
  },
],
```

🔹 **Tương đương SQL:**

```sql
CREATE FULLTEXT INDEX fulltext_name_desc_slug ON products(name, description, slug);
```

🔹 **Lệnh truy vấn tìm kiếm với FULLTEXT:**

```sql
SELECT * FROM products WHERE MATCH(name, description, slug) AGAINST('keyword');
```

---

### **4️⃣ GIN & GIST INDEX (PostgreSQL)**

📌 **Dùng cho dữ liệu JSON, mảng, vector**  
✅ **Tối ưu tìm kiếm trên JSONB, array, hoặc search text**

🔹 **Cách sử dụng (PostgreSQL-only):**

```js
indexes: [
  {
    using: "GIN",
    fields: ["tags"], // Tối ưu tìm kiếm trên cột JSON hoặc array
  },
],
```

🔹 **Tương đương SQL:**

```sql
CREATE INDEX idx_tags ON products USING GIN(tags);
```

---

### **5️⃣ HASH INDEX**

📌 **Tối ưu truy vấn với `=` hoặc `IN` nhưng không hỗ trợ range query (`<, >, BETWEEN`)**  
✅ **Tốt khi tra cứu nhanh các giá trị cụ thể (lookup)**

🔹 **Cách sử dụng (PostgreSQL-only, MySQL chỉ hỗ trợ trên MEMORY table):**

```js
indexes: [
  {
    using: "HASH",
    fields: ["email"], // Tối ưu khi truy vấn với WHERE email = 'abc@example.com'
  },
],
```

🔹 **Tương đương SQL:**

```sql
CREATE INDEX idx_email ON users USING HASH(email);
```

---

### **6️⃣ COMPOSITE INDEX (INDEX NHIỀU CỘT)**

📌 **Tối ưu truy vấn khi có nhiều điều kiện WHERE hoặc ORDER BY**  
✅ **Tốt khi cần sắp xếp, lọc trên nhiều cột cùng lúc**

🔹 **Cách sử dụng:**

```js
indexes: [
  {
    name: "idx_category_price",
    fields: ["category_id", "price"], // Index trên cả 2 cột
  },
],
```

🔹 **Tương đương SQL:**

```sql
CREATE INDEX idx_category_price ON products(category_id, price);
```

---

### **7️⃣ PARTIAL INDEX (PostgreSQL)**

📌 **Tạo index chỉ trên một phần của bảng (ví dụ: chỉ index những sản phẩm đang public)**  
✅ **Tiết kiệm tài nguyên, tối ưu hiệu suất**

🔹 **Cách sử dụng:**

```js
indexes: [
  {
    name: "idx_public_products",
    fields: ["is_public"],
    where: { is_public: true }, // Chỉ tạo index cho sản phẩm public
  },
],
```

🔹 **Tương đương SQL:**

```sql
CREATE INDEX idx_public_products ON products(is_public) WHERE is_public = true;
```

---

### **8️⃣ SPATIAL INDEX (Dữ liệu không gian - MySQL, PostgreSQL)**

📌 **Dùng để lưu trữ & tìm kiếm dữ liệu tọa độ, GIS, vị trí địa lý**  
✅ **Cần kiểu dữ liệu `POINT`, `GEOMETRY` hoặc `GEOGRAPHY`**

🔹 **Cách sử dụng:**

```js
indexes: [
  {
    type: "SPATIAL",
    name: "idx_location",
    fields: ["location"],
  },
],
```

🔹 **Tương đương SQL:**

```sql
CREATE SPATIAL INDEX idx_location ON stores(location);
```

---

## **🔥 Kết luận: Nên dùng index nào?**

| Loại Index            | Khi nào nên dùng?                                       |
| --------------------- | ------------------------------------------------------- |
| **B-TREE (mặc định)** | Truy vấn có `WHERE`, `ORDER BY`, `GROUP BY`             |
| **UNIQUE INDEX**      | Đảm bảo giá trị không trùng lặp (email, username, slug) |
| **FULLTEXT INDEX**    | Tìm kiếm văn bản nhanh (MySQL, MariaDB)                 |
| **GIN/GIST INDEX**    | Tìm kiếm JSON, array (PostgreSQL)                       |
| **HASH INDEX**        | Lookup nhanh trên giá trị cụ thể (PostgreSQL)           |
| **COMPOSITE INDEX**   | Khi truy vấn thường xuyên sử dụng nhiều cột             |
| **PARTIAL INDEX**     | Tạo index chỉ trên một phần bảng (PostgreSQL)           |
| **SPATIAL INDEX**     | Lưu trữ dữ liệu tọa độ, bản đồ                          |

---

💡 **Nếu hệ thống e-commerce dưới 20K sản phẩm**, chỉ cần:  
✅ **B-TREE index trên category_id, price**  
✅ **FULLTEXT index nếu có tìm kiếm sản phẩm**  
✅ **Composite index cho các truy vấn phổ biến**

🚀 **Còn nếu bạn có hàng triệu sản phẩm, hãy xem xét ElasticSearch hoặc MeiliSearch!**
