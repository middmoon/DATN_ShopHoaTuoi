Dưới đây là thiết kế **Audit Log** để lưu lại hành vi tìm kiếm, lọc, và xem sản phẩm của khách hàng, giúp bạn **phân tích xu hướng thị trường** theo từng giai đoạn.

---

## 🏗 **Thiết kế bảng `CustomerSearchLog`**

Bảng này ghi lại toàn bộ lịch sử tìm kiếm, lọc, và xem sản phẩm của người dùng.

### **🔹 Cấu trúc bảng `CustomerSearchLog`**

| Cột              | Kiểu dữ liệu | Mô tả                                    |
| ---------------- | ------------ | ---------------------------------------- |
| `id`             | UUID         | Khóa chính                               |
| `user_id`        | UUID         | Người dùng thực hiện hành động           |
| `action_type`    | ENUM         | `"search"`, `"filter"`, `"view_product"` |
| `search_key`     | STRING       | Từ khóa tìm kiếm (nếu có)                |
| `search_filters` | JSON         | Bộ lọc (nếu có)                          |
| `product_id`     | UUID         | Sản phẩm được xem (nếu có)               |
| `timestamp`      | DATE         | Thời gian ghi nhận hành động             |

---

## **📌 Code Sequelize Model `CustomerSearchLog`**

```javascript
"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CustomerSearchLog extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }

  CustomerSearchLog.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      action_type: {
        type: DataTypes.ENUM("search", "filter", "view_product"),
        allowNull: false,
      },
      search_key: {
        type: DataTypes.STRING,
        allowNull: true, // Chỉ có giá trị nếu action là "search"
      },
      search_filters: {
        type: DataTypes.JSON, // Ví dụ: { "category": "laptop", "price_range": "10-20 triệu" }
        allowNull: true, // Chỉ có giá trị nếu action là "filter"
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: true, // Chỉ có giá trị nếu action là "view_product"
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "CustomerSearchLog",
      tableName: "customer_search_logs",
      timestamps: true,
    }
  );

  return CustomerSearchLog;
};
```

---

## 📊 **Cách sử dụng**

Dưới đây là cách bạn có thể **ghi lại hành vi của người dùng** trong hệ thống:

### **1️⃣ Ghi log khi người dùng tìm kiếm sản phẩm**

```javascript
await CustomerSearchLog.create({
  user_id: userId,
  action_type: "search",
  search_key: "iPhone 15",
});
```

---

### **2️⃣ Ghi log khi người dùng áp dụng bộ lọc**

```javascript
await CustomerSearchLog.create({
  user_id: userId,
  action_type: "filter",
  search_filters: { category: "laptop", price_range: "10-20 triệu" },
});
```

---

### **3️⃣ Ghi log khi người dùng xem sản phẩm**

```javascript
await CustomerSearchLog.create({
  user_id: userId,
  action_type: "view_product",
  product_id: productId,
});
```

---

## **📈 Cách phân tích dữ liệu**

### **🔍 1. Tìm hiểu xu hướng tìm kiếm của khách hàng**

```javascript
const popularSearches = await CustomerSearchLog.findAll({
  where: { action_type: "search" },
  attributes: ["search_key", [sequelize.fn("COUNT", "search_key"), "count"]],
  group: ["search_key"],
  order: [[sequelize.literal("count"), "DESC"]],
  limit: 10,
});
```

👉 **Kết quả**: Hiển thị **10 từ khóa tìm kiếm phổ biến nhất**

---

### **🔍 2. Xác định sản phẩm nào được xem nhiều nhất**

```javascript
const popularProducts = await CustomerSearchLog.findAll({
  where: { action_type: "view_product" },
  attributes: ["product_id", [sequelize.fn("COUNT", "product_id"), "count"]],
  group: ["product_id"],
  order: [[sequelize.literal("count"), "DESC"]],
  limit: 10,
});
```

👉 **Kết quả**: Hiển thị **10 sản phẩm được xem nhiều nhất**

---

### **🔍 3. Phân tích theo giai đoạn (ví dụ: trong tháng này)**

```javascript
const thisMonthLogs = await CustomerSearchLog.findAll({
  where: {
    timestamp: {
      [Op.between]: [new Date("2024-02-01"), new Date("2024-02-29")],
    },
  },
});
```

👉 **Kết quả**: Lọc dữ liệu tìm kiếm trong **tháng 2/2024**

---

## **🎯 Kết luận**

✔ **Hỗ trợ phân tích hành vi người dùng** để tối ưu trải nghiệm & marketing.  
✔ **Ghi nhận mọi thao tác** của khách hàng như tìm kiếm, lọc sản phẩm, xem sản phẩm.  
✔ **Truy vấn dễ dàng** để tìm ra xu hướng thị trường theo từng giai đoạn.

Để **phân tích dữ liệu từ `search_query`**, bạn có thể làm như sau:

1. **Thống kê số lần tìm kiếm của từng danh mục sản phẩm.**
2. **Thống kê các khoảng giá mà khách hàng quan tâm nhất.**
3. **Thống kê các từ khóa tìm kiếm phổ biến.**
4. **Phân tích xu hướng tìm kiếm theo thời gian.**

---

## **📌 1. Lấy tất cả logs tìm kiếm**

Trước tiên, lấy tất cả dữ liệu từ `search_logs` để phân tích.

```javascript
const { SearchLogs } = require("../models");

async function getAllSearchLogs() {
  const logs = await SearchLogs.findAll();
  return logs.map((log) => log.search_query);
}
```

---

## **📌 2. Thống kê số lần tìm kiếm theo danh mục**

**Ý tưởng:** Duyệt qua tất cả `search_query`, đếm số lần xuất hiện của mỗi danh mục.

```javascript
async function getCategorySearchStats() {
  const logs = await getAllSearchLogs();
  const categoryCount = {};

  logs.forEach((log) => {
    if (log.categories) {
      log.categories.forEach((category) => {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
    }
  });

  return categoryCount;
}
```

**📊 Kết quả:**

```json
{
  "Hoa tặng mẹ": 25,
  "Hoa ngày phụ nữ": 40,
  "Hoa sinh nhật": 15
}
```

---

## **📌 3. Thống kê khoảng giá tìm kiếm phổ biến**

**Ý tưởng:** Gom nhóm khoảng giá khách hàng thường tìm kiếm.

```javascript
async function getPriceRangeStats() {
  const logs = await getAllSearchLogs();
  const priceRanges = {
    "Dưới 1 triệu": 0,
    "1 triệu - 5 triệu": 0,
    "5 triệu - 10 triệu": 0,
    "Trên 10 triệu": 0,
  };

  logs.forEach((log) => {
    if (log.min_price || log.max_price) {
      const min = log.min_price || 0;
      const max = log.max_price || Infinity;

      if (max < 1000000) priceRanges["Dưới 1 triệu"]++;
      else if (min >= 1000000 && max <= 5000000) priceRanges["1 triệu - 5 triệu"]++;
      else if (min >= 5000000 && max <= 10000000) priceRanges["5 triệu - 10 triệu"]++;
      else priceRanges["Trên 10 triệu"]++;
    }
  });

  return priceRanges;
}
```

**📊 Kết quả:**

```json
{
  "Dưới 1 triệu": 10,
  "1 triệu - 5 triệu": 30,
  "5 triệu - 10 triệu": 20,
  "Trên 10 triệu": 15
}
```

---

## **📌 4. Thống kê từ khóa tìm kiếm phổ biến**

**Ý tưởng:** Tách từ khóa trong `search` và đếm số lần xuất hiện.

```javascript
async function getPopularSearchKeywords() {
  const logs = await getAllSearchLogs();
  const keywordCount = {};

  logs.forEach((log) => {
    if (log.search) {
      const words = log.search.toLowerCase().split(" ");
      words.forEach((word) => {
        keywordCount[word] = (keywordCount[word] || 0) + 1;
      });
    }
  });

  return keywordCount;
}
```

**📊 Kết quả:**

```json
{
  "hoa": 50,
  "tươi": 30,
  "flower": 20,
  "đẹp": 15
}
```

---

## **📌 5. Thống kê xu hướng tìm kiếm theo thời gian**

**Ý tưởng:** Đếm số lần tìm kiếm theo từng ngày/tháng.

```javascript
async function getSearchTrends() {
  const logs = await SearchLogs.findAll({ attributes: ["createdAt"] });
  const trendData = {};

  logs.forEach((log) => {
    const date = log.createdAt.toISOString().split("T")[0]; // YYYY-MM-DD
    trendData[date] = (trendData[date] || 0) + 1;
  });

  return trendData;
}
```

**📊 Kết quả:**

```json
{
  "2025-02-25": 10,
  "2025-02-26": 15,
  "2025-02-27": 20
}
```

---

## **📌 Kết hợp tất cả vào API**

Bạn có thể gộp tất cả vào một API `/v1/analytics/search` để xem thống kê:

```javascript
router.get("/v1/analytics/search", async (req, res) => {
  try {
    const [categories, priceRanges, keywords, trends] = await Promise.all([
      getCategorySearchStats(),
      getPriceRangeStats(),
      getPopularSearchKeywords(),
      getSearchTrends(),
    ]);

    res.json({
      success: true,
      data: { categories, priceRanges, keywords, trends },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
```

---

## **🔥 Lợi ích của cách phân tích này**

✅ Dễ dàng xem **danh mục nào đang HOT**.  
✅ Tìm hiểu **giá sản phẩm nào khách hàng quan tâm nhất**.  
✅ Thống kê **từ khóa phổ biến** để tối ưu SEO.  
✅ Xác định **xu hướng thị trường theo từng ngày/tháng**.

Bạn muốn mở rộng thêm gì không? 🚀
