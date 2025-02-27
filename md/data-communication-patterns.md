Ngoài **REST API** và **GraphQL**, còn nhiều cách khác để triển khai và lấy dữ liệu trong một hệ thống backend. Dưới đây là một số phương pháp phổ biến:

---

## 1. **gRPC** (Google Remote Procedure Call)

🔹 **Mô tả:**

- Sử dụng giao thức **HTTP/2** để truyền dữ liệu nhị phân (binary).
- Hiệu suất cao hơn REST và GraphQL vì sử dụng Protocol Buffers (**protobuf**) thay vì JSON.
- Hỗ trợ **streaming**, cho phép server gửi nhiều phản hồi mà không cần nhiều request.

🔹 **Khi nào nên dùng?**

- Hệ thống **microservices** cần tốc độ cao.
- Ứng dụng **real-time** như chat, streaming, IoT.

🔹 **Ví dụ:**

- Backend service A muốn lấy dữ liệu từ service B bằng gRPC thay vì REST.

📌 **Thư viện cho Node.js:** [`grpc`](https://www.npmjs.com/package/@grpc/grpc-js)

---

## 2. **WebSockets**

🔹 **Mô tả:**

- Kết nối **hai chiều (full-duplex)** giữa client và server.
- Dữ liệu được đẩy xuống client ngay khi có thay đổi thay vì client phải request liên tục.
- Phù hợp cho **real-time apps** như chat, thông báo, tài chính, game.

🔹 **Khi nào nên dùng?**

- Ứng dụng **real-time** cần cập nhật liên tục mà không cần gửi request mới.
- Ví dụ: **Bảng giá chứng khoán, chat, game multiplayer, tracking GPS.**

🔹 **Ví dụ:**

- Dùng `socket.io` trong Node.js để gửi dữ liệu giá Bitcoin liên tục về client.

📌 **Thư viện phổ biến:** [`socket.io`](https://socket.io/)

---

## 3. **Server-Sent Events (SSE)**

🔹 **Mô tả:**

- Chỉ hỗ trợ **one-way streaming** từ server đến client (không full-duplex như WebSockets).
- Dữ liệu gửi từ server về client theo **sự kiện** mà không cần request mới.
- Đơn giản hơn WebSockets nhưng chỉ phù hợp khi **chỉ có server gửi dữ liệu về client**.

🔹 **Khi nào nên dùng?**

- Cập nhật dữ liệu tự động như **thông báo, bảng tin, live scores.**
- Không cần giao tiếp hai chiều.

🔹 **Ví dụ:**

- Server gửi dữ liệu giá cổ phiếu về trình duyệt mỗi giây.

📌 **Thư viện:** Không cần cài thêm, chỉ dùng `EventSource` API trên trình duyệt.

---

## 4. **Direct Database Access (DDA)**

🔹 **Mô tả:**

- Client kết nối trực tiếp vào database mà không cần qua API.
- Ví dụ: **Ứng dụng desktop hoặc script phân tích dữ liệu kết nối trực tiếp MySQL, PostgreSQL, MongoDB.**

🔹 **Khi nào nên dùng?**

- Khi bạn có ứng dụng nội bộ cần truy vấn nhanh mà không cần API trung gian.
- Không nên dùng nếu client là public vì **bảo mật kém**.

🔹 **Ví dụ:**

- Dùng Python + SQLAlchemy để kết nối trực tiếp vào PostgreSQL và lấy dữ liệu.

📌 **Lưu ý:** DDA **không phù hợp với web client** vì vấn đề bảo mật!

---

## 5. **Message Queue (MQ) / Event-Driven Architecture**

🔹 **Mô tả:**

- Server không trả về ngay mà gửi dữ liệu vào hàng đợi (**queue**) hoặc hệ thống pub/sub (**publish/subscribe**).
- Microservices có thể lấy dữ liệu từ queue thay vì gọi API.

🔹 **Khi nào nên dùng?**

- Xử lý **bất đồng bộ**, giảm tải API (ví dụ: gửi email, xử lý ảnh, AI inference).
- Hệ thống **microservices** cần giao tiếp mà không gọi API trực tiếp.

🔹 **Ví dụ:**

- User đăng ký tài khoản → Hệ thống gửi sự kiện đến RabbitMQ để xử lý gửi email sau đó.

📌 **Thư viện phổ biến:**

- **RabbitMQ** (`amqplib` trong Node.js)
- **Kafka** (dùng cho big data, streaming)

---

## 6. **File-based Data Transfer**

🔹 **Mô tả:**

- Lưu dữ liệu vào file (`CSV`, `JSON`, `XML`, `Parquet`) và gửi qua SFTP, email hoặc API.
- Dùng nhiều trong **ETL (Extract, Transform, Load)** để di chuyển dữ liệu giữa hệ thống.

🔹 **Khi nào nên dùng?**

- Khi hệ thống cần chuyển dữ liệu lớn giữa các nền tảng không thể kết nối trực tiếp.
- Ví dụ: **Kết xuất báo cáo từ SQL → Xuất ra CSV → Import vào Google Sheets.**

🔹 **Ví dụ:**

- Xuất dữ liệu người dùng từ MySQL ra file CSV, tải lên Google Drive.

📌 **Thư viện:** `csv-parser`, `fs`, `fast-csv`

---

## 7. **Federated GraphQL / Dataloader**

🔹 **Mô tả:**

- **Federated GraphQL**: Kết hợp nhiều GraphQL APIs thành một endpoint duy nhất.
- **Dataloader**: Batch các request GraphQL để tối ưu hóa hiệu suất.

🔹 **Khi nào nên dùng?**

- Khi có nhiều nguồn dữ liệu (MySQL, Redis, REST API khác) và muốn kết hợp vào một API duy nhất.

🔹 **Ví dụ:**

- Kết hợp API người dùng từ MySQL + API sản phẩm từ MongoDB vào một endpoint GraphQL duy nhất.

📌 **Thư viện:** `@apollo/gateway`, `dataloader`

---

## 8. **P2P Data Fetching (Peer-to-Peer / Blockchain)**

🔹 **Mô tả:**

- Thay vì lấy dữ liệu từ một server, client có thể **lấy từ nhiều nguồn (peers)**.
- Ví dụ: **IPFS, Blockchain, WebRTC.**

🔹 **Khi nào nên dùng?**

- Khi cần dữ liệu **phi tập trung**, không phụ thuộc vào một server duy nhất.

🔹 **Ví dụ:**

- Dùng IPFS để lưu trữ dữ liệu phi tập trung (như NFT metadata).

📌 **Thư viện:** `ipfs-http-client`, `web3.js`

---

## **Tóm tắt**

| Cách lấy dữ liệu      | Mô tả                       | Khi nào dùng?                      | Công nghệ phổ biến   |
| --------------------- | --------------------------- | ---------------------------------- | -------------------- |
| **REST API**          | Truy vấn bằng HTTP          | Truy xuất dữ liệu chuẩn            | Express, Fastify     |
| **GraphQL**           | Query dữ liệu linh hoạt     | Khi cần tối ưu query               | Apollo, GraphQL Yoga |
| **gRPC**              | Giao tiếp nhanh bằng binary | Microservices, hiệu suất cao       | `@grpc/grpc-js`      |
| **WebSockets**        | Kết nối real-time           | Chat, game, stock price            | `socket.io`          |
| **SSE**               | Server push dữ liệu         | Notifications, live scores         | EventSource API      |
| **Direct DB Access**  | Truy cập DB trực tiếp       | Ứng dụng nội bộ, phân tích dữ liệu | MySQL, MongoDB       |
| **Message Queue**     | Gửi message không đồng bộ   | Xử lý nền, microservices           | RabbitMQ, Kafka      |
| **File-based**        | Lưu file dữ liệu            | Xuất/nhập dữ liệu lớn              | CSV, JSON, Parquet   |
| **Federated GraphQL** | Gộp nhiều nguồn thành 1 API | Dữ liệu từ nhiều hệ thống          | Apollo Federation    |
| **P2P / Blockchain**  | Dữ liệu phi tập trung       | DeFi, Web3                         | IPFS, Web3.js        |

---
