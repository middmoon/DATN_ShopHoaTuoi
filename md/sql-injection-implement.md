### **1. FastAPI Service (SQL Injection Detection)**

- Chạy mô hình ONNX để kiểm tra request có chứa SQL Injection hay không.
- Nhận input từ Express.js middleware, xử lý, và trả về kết quả (1 nếu nghi ngờ SQLi, 0 nếu an toàn).

**Cài đặt FastAPI + ONNXRuntime**

```bash
pip install fastapi uvicorn onnxruntime numpy pydantic
```

**`sql_injection_detector.py`** (Service chính)

```python
import onnxruntime as ort
import numpy as np
import pickle
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Load ONNX model
session = ort.InferenceSession("sql_injection_model.onnx")

# Load vectorizer & scaler
with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

class QueryRequest(BaseModel):
    query: str

def preprocess(query: str):
    # Trích xuất đặc trưng văn bản với TF-IDF
    text_features = vectorizer.transform([query]).toarray()

    # Đặc trưng số
    numeric_features = np.array([
        [
            int(" " in query),  # Có khoảng trắng không
            int(any(char in query for char in "!@#$%^&*()_+={}[]|:;<>,.?/~")),  # Có ký tự đặc biệt không
            query.count(" "),  # Số khoảng trắng
            sum(1 for char in query if not char.isalnum() and char != " ")  # Số ký tự đặc biệt
        ]
    ], dtype=np.float32)

    # Kết hợp đặc trưng
    combined_features = np.hstack((text_features, numeric_features))

    # Chuẩn hóa (nếu có dùng scaler)
    combined_features = scaler.transform(combined_features)

    return combined_features.astype(np.float32)

@app.post("/detect")
async def detect_sql_injection(request: QueryRequest):
    input_data = preprocess(request.query)
    result = session.run(None, {"input": input_data})[0][0]
    return {"is_sql_injection": int(result > 0.5)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
```

---

### **2. Express.js Middleware (Chuyển hướng request để kiểm tra SQL Injection)**

**Cài đặt `axios` để gửi request đến FastAPI**

```bash
npm install axios
```

**Middleware kiểm tra SQL Injection**

```javascript
const axios = require("axios");

const detectSQLInjection = async (req, res, next) => {
  const userInput = req.body.query || req.query.query || ""; // Lấy input từ request

  try {
    const response = await axios.post("http://localhost:8001/detect", { query: userInput });
    if (response.data.is_sql_injection) {
      return res.status(403).json({ error: "SQL Injection detected!" });
    }
    next(); // Tiếp tục nếu an toàn
  } catch (error) {
    console.error("SQL Injection Service Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = detectSQLInjection;
```

---

### **3. Áp dụng Middleware vào Express.js**

**Trong `app.js`**

```javascript
const express = require("express");
const detectSQLInjection = require("./middlewares/sqlInjectionMiddleware");

const app = express();
app.use(express.json());

// Middleware kiểm tra SQL Injection
app.use(detectSQLInjection);

app.post("/search", (req, res) => {
  const { query } = req.body;
  res.json({ message: `Query executed: ${query}` });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

### **Kết quả mong đợi**

- **FastAPI service** chạy trên `localhost:8001` để kiểm tra SQL Injection bằng ONNX.
- **Express.js Middleware** sẽ gửi dữ liệu đến service này trước khi xử lý request.
- **Nếu model phát hiện SQL Injection**, request sẽ bị từ chối với `403 Forbidden`.

---

---

---

---

Bạn có thể thiết lập môi trường cho dự án Python của mình bằng cách sử dụng **virtualenv**. Dưới đây là hướng dẫn chi tiết:

---

### **1️⃣ Tạo môi trường ảo**

```bash
python -m venv venv
```

- `venv` là thư mục chứa môi trường ảo.

### **2️⃣ Kích hoạt môi trường**

- **Windows** (CMD/Powershell):
  ```bash
  venv\Scripts\activate
  ```
- **Mac/Linux**:
  ```bash
  source venv/bin/activate
  ```

### **3️⃣ Cài đặt các thư viện cần thiết**

```bash
pip install -r requirements.txt
```

Hoặc cài thủ công:

```bash
pip install fastapi onnxruntime numpy scikit-learn uvicorn
```

### **4️⃣ Lưu danh sách thư viện**

```bash
pip freeze > requirements.txt
```

### **5️⃣ Hủy kích hoạt môi trường ảo**

```bash
deactivate
```

---
