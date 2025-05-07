![image](https://github.com/user-attachments/assets/2957c80a-a77a-4514-9737-e1a33bc844a2)

Kiến trúc hệ thống website bán hoa tươi online sử dụng mô hình client-server
**Các thành phần của hệ thống**

1.Máy chủ xử lý các tác vụ nghiệp vụ cho doanh nghiệp (Business Server) tập trung vào xử lý tất cả yêu cầu chức năng đã được đề ra từ trước như xử lý các logic tính toán đơn hàng, quản lý sản phẩm, đơn hàng. Kết hợp với cơ sở dữ liệu cho các tác vụ doanh nghiệp để lưu trữ các thông tin về khách hàng, sản phẩm, đơn hàng.

2.Máy chủ xử lý các tác vụ về phân tích và theo dõi hệ thống (Logging Server) tập trung vào xử lý các tác vụ quản lý các thông tin của hệ thống như số lượng yêu cầu HTTP, theo dõi các hành vi của người dùng, theo dõi xu thế tìm kiếm và kết quả tìm kiếm từ đó có thể biết được xu hướng tìm kiếm của các khách hàng tiềm năng hoặc phát hiện những sai xót trong hệ thống. Kết hợp chung với cơ sở dữ liệu dành riêng cho các hoạt động theo dõi hệ thống.

3.Hệ thống sử dụng Cloudinary để lưu trữ hình ảnh và tương tác trực tiếp với Business Server.

4.Redis Service sử dụng cho việc caching các query sản phẩm nhằm đảm bảo tốc độ trả dữ liệu cho người dùng và sử dụng để theo dõi các token đã logout nhằm đảm bảo hệ thống không bị rò rỉ các token đã hết hạn.

5.RabbitMQ Services là một trung gian để lấy và lưu trữ các dữ liệu từ mọi yêu cầu HTTP của hệ thống thông qua middleware sau đó cùng với Logger Worker để ghi các dữ liệu vào cơ sở dữ liệu. 

**Database**
[De Tai 30: ShopHoaTuoi - DATN .png - Google Drive](https://drive.google.com/file/d/1D6TkSgq7F2pa4upvj5F9JFVsIZe3exL8/view)

![De Tai 30_ ShopHoaTuoi - DATN ](https://github.com/user-attachments/assets/b9b7dcb3-14dc-4424-bd41-4fd26240db2e)

**Video Demo**
https://youtu.be/uc0IxFiSnUs
