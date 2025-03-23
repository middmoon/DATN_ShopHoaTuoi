## 🚀 **Tổng hợp các bước sử dụng API để lưu Order vào database và tích hợp thanh toán VNPay**

Dưới đây là **quy trình đầy đủ** từ khi người dùng đặt hàng đến khi hoàn tất thanh toán qua VNPay.

---

## **📌 1️⃣ Bước 1: Người dùng đặt hàng**

Khi khách hàng nhấn "Đặt hàng", frontend sẽ gửi yêu cầu đến **API `/order`** để lưu đơn hàng vào database.

### **➡️ Gọi API `/order` để lưu đơn hàng**

```javascript
const createOrder = async (orderData) => {
  const response = await fetch("http://localhost:3000/api/v1/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Lỗi khi tạo đơn hàng");
  }

  return response.json(); // Trả về thông tin order đã lưu
};
```

### **➡️ Backend: API `/order` để lưu vào database**

```javascript
router.post("/order", async (req, res) => {
  try {
    const newOrder = await Order.create({
      customer_id: req.body.customer_id,
      total_price: req.body.total_price,
      status_id: 1, // "Chờ xác nhận"
      delivery_address: req.body.delivery_address,
    });

    res.json(newOrder);
  } catch (error) {
    console.error("Lỗi khi tạo order:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
```

---

## **📌 2️⃣ Bước 2: Gọi API `/payment/vnpay/create_payment_url` để lấy link thanh toán**

Sau khi lưu đơn hàng thành công, frontend gọi API **tạo link thanh toán VNPay**.

### **➡️ Gọi API `/payment/vnpay/create_payment_url`**

```javascript
const createVNPayPayment = async (orderId, amount) => {
  const response = await fetch("http://localhost:3000/api/v1/payment/vnpay/create_payment_url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      language: "vn",
      bankCode: "VNBANK",
      orderInfo: `Đơn hàng #${orderId}`,
    }),
  });

  if (!response.ok) {
    throw new Error("Lỗi khi tạo link thanh toán VNPay");
  }

  return response.json(); // Trả về URL thanh toán
};
```

### **➡️ Backend: API `/payment/vnpay/create_payment_url`**

```javascript
router.post("/payment/vnpay/create_payment_url", async (req, res) => {
  try {
    const { amount, language, bankCode, orderInfo } = req.body;

    // **Tạo Payment trong database trước**
    const payment = await Payment.create({
      order_id: orderInfo.split("#")[1], // Lấy order ID từ orderInfo
      amount,
      method_id: 1, // VNPay
      status: "Chờ xác nhận",
    });

    // **Gọi VNPay API để lấy link thanh toán**
    const paymentUrl = await generateVNPayUrl(payment.order_id, amount, language, bankCode);

    res.json({ paymentUrl });
  } catch (error) {
    console.error("Lỗi khi tạo thanh toán VNPay:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
```

---

## **📌 3️⃣ Bước 3: Người dùng thanh toán trên VNPay**

- Người dùng được **chuyển hướng** đến VNPay để nhập thông tin và thanh toán.
- Sau khi thanh toán xong, VNPay sẽ **redirect về API `/payment/vnpay/vnpay_return`** của bạn.

---

## **📌 4️⃣ Bước 4: API `/payment/vnpay/vnpay_return` cập nhật trạng thái thanh toán**

Sau khi thanh toán, VNPay gửi dữ liệu về API `vnpay_return`.

### **➡️ Backend: API `/payment/vnpay/vnpay_return`**

```javascript
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { Payment, Order } = require("../../models");

router.get("/payment/vnpay/vnpay_return", async (req, res) => {
  try {
    const query = req.query;
    const secureHash = query.vnp_SecureHash;
    delete query.vnp_SecureHash;

    // 1️⃣ **Xác minh chữ ký bảo mật**
    const secretKey = "YOUR_VNPAY_SECRET_KEY";
    const hash = crypto.createHmac("sha512", secretKey).update(new URLSearchParams(query).toString()).digest("hex");

    if (hash !== secureHash) {
      return res.status(400).json({ message: "Chữ ký không hợp lệ!" });
    }

    // 2️⃣ **Lấy thông tin giao dịch**
    const orderId = query.vnp_TxnRef;
    const transactionStatus = query.vnp_TransactionStatus;
    const responseCode = query.vnp_ResponseCode;

    let paymentStatus;
    let orderStatus;

    if (transactionStatus === "00" && responseCode === "00") {
      paymentStatus = "Hoàn thành";
      orderStatus = 3; // "Hoàn thành"
    } else {
      paymentStatus = "Thất bại";
      orderStatus = 4; // "Đơn bị hủy"
    }

    // 3️⃣ **Cập nhật Payment**
    await Payment.update({ status: paymentStatus }, { where: { order_id: orderId } });

    // 4️⃣ **Cập nhật Order**
    await Order.update({ status_id: orderStatus }, { where: { _id: orderId } });

    // 5️⃣ **Chuyển hướng người dùng**
    return res.redirect(`http://localhost:3000/payment-result?orderId=${orderId}&status=${paymentStatus}`);
  } catch (error) {
    console.error("Lỗi khi xử lý phản hồi VNPay:", error);
    return res.status(500).json({ message: "Lỗi server!" });
  }
});

module.exports = router;
```

---

## **📌 5️⃣ Bước 5: Hiển thị kết quả trên giao diện**

Sau khi VNPay redirect về `payment-result`, frontend lấy dữ liệu từ URL và hiển thị thông báo.

```javascript
// Lấy tham số từ URL
const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get("status");

if (paymentStatus === "Hoàn thành") {
  alert("Thanh toán thành công! Cảm ơn bạn.");
  window.location.href = "/order-success";
} else {
  alert("Thanh toán thất bại. Vui lòng thử lại!");
  window.location.href = "/checkout";
}
```

---

## **🎯 Tổng kết quy trình**

| Bước                                               | Mô tả                                         |
| -------------------------------------------------- | --------------------------------------------- |
| **1️⃣ Gọi API `/order`**                            | Lưu đơn hàng vào database                     |
| **2️⃣ Gọi API `/payment/vnpay/create_payment_url`** | Lưu payment và lấy link thanh toán VNPay      |
| **3️⃣ Người dùng thanh toán**                       | VNPay xử lý giao dịch                         |
| **4️⃣ VNPay gọi API `/payment/vnpay/vnpay_return`** | Kiểm tra giao dịch và cập nhật database       |
| **5️⃣ Hiển thị kết quả**                            | Người dùng được chuyển hướng về trang kết quả |

---

## **📌 Khi nào nên gộp API `/order` và `/payment/vnpay/create_payment_url`?**

Bạn **có thể gộp chung** nếu:

- **Thanh toán là bắt buộc** để đơn hàng hợp lệ.
- **Chỉ có VNPay**, không có COD hoặc phương thức khác.

Nhưng cách **tách riêng** sẽ giúp bạn:
✅ **Quản lý đơn hàng tốt hơn** (nếu thanh toán lỗi, đơn hàng vẫn tồn tại).  
✅ **Dễ mở rộng** cho các phương thức thanh toán khác.

---

🔥 **Giờ hệ thống của bạn đã sẵn sàng xử lý VNPay một cách chuyên nghiệp!** 🚀 Bạn có muốn tối ưu gì thêm không? 😃
