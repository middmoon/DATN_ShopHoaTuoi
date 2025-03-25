Dưới đây là bảng **tổng hợp các HTTP status code phổ biến nhất** và **use case** thường gặp, đặc biệt hữu ích cho việc phát triển **RESTful API hoặc Web app**:

---

## ✅ 1xx – Informational (Thông tin)

| Mã      | Tên      | Use case                                                            |
| ------- | -------- | ------------------------------------------------------------------- |
| **100** | Continue | Dùng khi gửi request lớn, server báo "OK, tiếp tục gửi". Hiếm dùng. |

---

## 🟢 2xx – Success (Thành công)

| Mã      | Tên        | Use case                                                                                                      |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| **200** | OK         | ✔️ Thành công & có dữ liệu trả về. Phổ biến nhất.                                                             |
| **201** | Created    | ✔️ Tạo mới thành công (POST). Dùng khi tạo resource như user, order...                                        |
| **202** | Accepted   | Yêu cầu đã nhận, đang xử lý bất đồng bộ (ví dụ: background jobs).                                             |
| **204** | No Content | ✔️ Thành công nhưng **không có gì trả về**. Dùng với `DELETE`, `PUT`, `PATCH` khi không cần dữ liệu phản hồi. |

---

## 🟡 3xx – Redirection (Chuyển hướng)

| Mã      | Tên               | Use case                                         |
| ------- | ----------------- | ------------------------------------------------ |
| **301** | Moved Permanently | URL đã thay đổi vĩnh viễn. SEO redirect.         |
| **302** | Found             | Chuyển hướng tạm thời. Ví dụ sau login.          |
| **304** | Not Modified      | Client dùng cache. Không cần tải lại tài nguyên. |

---

## 🔴 4xx – Client Error (Lỗi từ phía client)

| Mã      | Tên                  | Use case                                                                                                            |
| ------- | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **400** | Bad Request          | Request sai định dạng, thiếu dữ liệu, validate lỗi.                                                                 |
| **401** | Unauthorized         | Chưa đăng nhập / token sai. Dùng với xác thực.                                                                      |
| **403** | Forbidden            | Đã đăng nhập nhưng **không có quyền** truy cập.                                                                     |
| **404** | Not Found            | Không tìm thấy resource (ID không tồn tại, route sai).                                                              |
| **405** | Method Not Allowed   | Gọi sai HTTP method (vd: dùng `POST` thay vì `GET`).                                                                |
| **409** | Conflict             | Trùng dữ liệu, ví dụ tạo tài khoản mà email đã tồn tại.                                                             |
| **422** | Unprocessable Entity | Dữ liệu hợp lệ về cấu trúc, nhưng không thỏa điều kiện logic. Dùng khi `validation` phức tạp (Laravel thường dùng). |

---

## 🔥 5xx – Server Error (Lỗi từ phía server)

| Mã      | Tên                   | Use case                                                  |
| ------- | --------------------- | --------------------------------------------------------- |
| **500** | Internal Server Error | ❌ Lỗi không xác định trong backend.                      |
| **502** | Bad Gateway           | Server nhận phản hồi lỗi từ upstream (gateway, proxy).    |
| **503** | Service Unavailable   | Server đang quá tải hoặc bảo trì.                         |
| **504** | Gateway Timeout       | Timeout từ upstream server (microservices, external API). |

---

## 📌 Gợi ý dùng trong RESTful API

| Hành động    | Mã thường dùng              |
| ------------ | --------------------------- |
| GET /item    | `200 OK` hoặc `404`         |
| POST /item   | `201 Created` hoặc `400`    |
| PUT /item    | `200` hoặc `204`, `404`     |
| DELETE /item | `204 No Content` hoặc `404` |
| Lỗi xác thực | `401` hoặc `403`            |
| Validate lỗi | `400` hoặc `422`            |
| Server lỗi   | `500`                       |

---
