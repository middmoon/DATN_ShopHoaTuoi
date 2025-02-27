Vì file index của bạn bị lỗi, bạn cần **xóa file index cũ và tạo lại**. Hãy làm theo các bước sau:

---

### 🛠 1. **Xóa file index bị lỗi**

Chạy lệnh sau trong thư mục repository:

```powershell
rm -Force .git\index
```

(Nếu dùng Git Bash, dùng `rm -f .git/index`)

Sau đó chạy:

```powershell
git reset
```

---

### 🛠 2. **Kiểm tra và sửa lỗi repository**

Nếu vẫn bị lỗi, chạy:

```powershell
git fsck --full
```

Nếu thấy lỗi, tiếp tục với:

```powershell
git reflog expire --all --stale
git fsck --full --no-dangling
```

---

### 🛠 3. **Dọn dẹp repository**

```powershell
git gc --prune=now
git fsck --full
```

---

### 🛠 4. **Clone lại repository (nếu cần)**

Nếu các cách trên không hiệu quả, bạn có thể **xóa repo và clone lại từ GitHub**:

```powershell
cd ..
Rename-Item demo demo_backup  # Đổi tên thư mục cũ để sao lưu
git clone https://github.com/middmoon/2111889-2111885-Thuc-Tap-Nghe-Nghiep.git demo
```

Sau đó, nếu có file nào chưa commit trong `demo_backup`, bạn có thể copy thủ công vào thư mục mới.

---

Thử từng bước và cho mình biết kết quả nhé! 🚀
