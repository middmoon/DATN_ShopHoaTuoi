### Hướng dẫn sử dụng:

1. **Import Collection:**
   - Mở Postman.
   - Chọn "Import" > "Raw Text" hoặc "File" và dán nội dung JSON trên.
2. **Cấu hình biến môi trường:**

   - Biến `{{baseUrl}}` được thiết lập là `http://localhost:3000/order`. Nếu server của bạn chạy trên địa chỉ khác, hãy cập nhật biến này tương ứng.

3. **Test các API:**
   - **Tạo đơn hàng:** Chạy request POST `/create_payment_url` với các tham số mẫu. API sẽ chuyển hướng bạn đến URL của VNPay (trong môi trường test sandbox).
   - **Kết quả thanh toán:** Sử dụng GET `/vnpay_return` với các query parameter mẫu để mô phỏng việc nhận kết quả thanh toán.
   - **IPN Thanh toán:** Test GET `/vnpay_ipn` với các tham số mẫu để kiểm tra xử lý thông báo bất đồng bộ.
   - **Truy vấn giao dịch & Hoàn tiền:** Sử dụng các request POST tương ứng để test các chức năng phụ trợ.

Với collection này, bạn có thể dễ dàng kiểm tra luồng giao dịch từ khởi tạo đơn hàng đến nhận kết quả thanh toán qua Postman. Nếu có bất kỳ thắc mắc nào khác, bạn cứ hỏi thêm nhé!
