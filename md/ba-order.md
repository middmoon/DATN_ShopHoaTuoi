Để thực hiện các truy vấn phân tích kinh doanh với model `Order`, bạn có thể sử dụng Sequelize để lấy dữ liệu theo nhiều cách khác nhau tùy vào mục đích phân tích. Dưới đây là một số truy vấn phổ biến:

---

### 1. **Doanh thu theo thời gian (Ngày, Tháng, Năm)**

Lấy tổng doanh thu theo từng ngày:

```javascript
const { Op } = require("sequelize");
const startDate = new Date("2024-01-01");
const endDate = new Date("2024-12-31");

const revenueByDay = await Order.findAll({
  attributes: [
    [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
    [sequelize.fn("SUM", sequelize.col("total_price")), "total_revenue"],
  ],
  where: {
    createdAt: { [Op.between]: [startDate, endDate] },
    status: { [Op.not]: "Đơn bị hủy" },
  },
  group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
  order: [[sequelize.fn("DATE", sequelize.col("createdAt")), "ASC"]],
  raw: true,
});
console.log(revenueByDay);
```

Tương tự có thể làm theo tháng:

```javascript
[sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%Y-%m"), "month"];
```

Hoặc theo năm:

```javascript
[sequelize.fn("YEAR", sequelize.col("createdAt")), "year"];
```

---

### 2. **Số lượng đơn hàng theo trạng thái**

```javascript
const orderCountByStatus = await Order.findAll({
  attributes: ["status", [sequelize.fn("COUNT", sequelize.col("_id")), "order_count"]],
  group: ["status"],
  raw: true,
});
console.log(orderCountByStatus);
```

---

### 3. **Tìm khách hàng có tổng giá trị đơn hàng cao nhất**

```javascript
const topCustomers = await Order.findAll({
  attributes: ["customer_id", "customer_name", [sequelize.fn("SUM", sequelize.col("total_price")), "total_spent"]],
  where: {
    customer_id: { [Op.ne]: null },
    status: { [Op.not]: "Đơn bị hủy" },
  },
  group: ["customer_id", "customer_name"],
  order: [[sequelize.literal("total_spent"), "DESC"]],
  limit: 10,
  raw: true,
});
console.log(topCustomers);
```

---

### 4. **Sản phẩm bán chạy nhất**

```javascript
const topProducts = await OrderProduct.findAll({
  attributes: ["product_id", [sequelize.fn("COUNT", sequelize.col("order_id")), "order_count"]],
  group: ["product_id"],
  order: [[sequelize.literal("order_count"), "DESC"]],
  limit: 10,
  raw: true,
});
console.log(topProducts);
```

Bạn có thể JOIN với model `Product` để lấy thêm thông tin sản phẩm.

---

### 5. **Doanh thu theo khu vực (Tỉnh, Quận, Phường)**

Theo tỉnh:

```javascript
const revenueByProvince = await Order.findAll({
  attributes: ["province_code", [sequelize.fn("SUM", sequelize.col("total_price")), "total_revenue"]],
  where: { status: { [Op.not]: "Đơn bị hủy" } },
  group: ["province_code"],
  order: [[sequelize.literal("total_revenue"), "DESC"]],
  raw: true,
});
console.log(revenueByProvince);
```

Tương tự có thể làm theo `district_code` hoặc `ward_code`.

---

### 6. **Thời gian trung bình xử lý đơn hàng**

```javascript
const avgProcessingTime = await Order.findAll({
  attributes: [[sequelize.fn("AVG", sequelize.literal("TIMESTAMPDIFF(HOUR, createdAt, updatedAt)")), "avg_processing_hours"]],
  where: { status: "Hoàn thành" },
  raw: true,
});
console.log(avgProcessingTime);
```

---

Bạn có thể kết hợp các truy vấn trên hoặc sử dụng `JOIN` với các model khác để có thêm insight chi tiết hơn. Nếu có yêu cầu cụ thể hơn về phân tích kinh doanh, mình có thể giúp tối ưu thêm! 🚀
