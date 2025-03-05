Nếu bạn muốn kiểm tra conflict và **merge code mà không bỏ mất phần nào**, hãy làm theo các bước sau:

---

### **🔹 Bước 1: Kiểm tra thay đổi trên máy**

Chạy lệnh sau để kiểm tra các file bị thay đổi trên máy bạn:

```sh
git status
```

Nó sẽ hiển thị danh sách các file đã bị chỉnh sửa nhưng chưa commit.

---

### **🔹 Bước 2: Tạo một bản sao lưu đề phòng**

Vì bạn không muốn mất bất kỳ thay đổi nào, hãy sao lưu code hiện tại bằng cách tạo một branch mới:

```sh
git checkout -b backup-branch
git add .
git commit -m "Backup trước khi pull"
```

Lúc này, bạn đã có một bản sao lưu an toàn.

---

### **🔹 Bước 3: Thực hiện `git pull` với merge conflict**

Bây giờ, quay lại branch chính và thực hiện `git pull`:

```sh
git checkout master  # Chuyển về branch chính (hoặc branch bạn đang làm việc)
git pull origin master
```

Nếu có conflict, Git sẽ báo lỗi và hiển thị danh sách file có conflict.

---

### **🔹 Bước 4: Kiểm tra và xử lý conflict**

Mở từng file có conflict (được đánh dấu với `<<<<<<<`, `=======`, `>>>>>>>`) và chỉnh sửa lại code cho đúng.

Sau khi chỉnh sửa xong, đánh dấu file đã resolved:

```sh
git add <file-bị-conflict>
```

Làm như vậy cho tất cả các file có conflict.

---

### **🔹 Bước 5: Hoàn tất merge và đẩy code lên**

Sau khi xử lý xong conflict, commit lại thay đổi:

```sh
git commit -m "Resolve merge conflict"
git push origin master
```

---

### **📌 Kết luận**

- **Nếu không muốn mất code** → Tạo backup branch trước khi pull.
- **Nếu gặp conflict** → Chỉnh sửa thủ công và commit lại.
- **Sau khi merge xong** → Push lên lại branch chính.

Cách này đảm bảo bạn **không mất bất kỳ đoạn code nào** và có thể xử lý conflict một cách an toàn. 🚀
