import onnxruntime as ort
import numpy as np
import pickle
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Load ONNX model
# session = ort.InferenceSession("random_forest.onnx")
# session = ort.InferenceSession("logistic_regression.onnx")
session = ort.InferenceSession("svm.onnx")



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
            # Có khoảng trắng không
            int(" " in query),  
            # Có ký tự đặc biệt không
            int(any(char in query for char in "!@#$%^&*()_+={}[]|:;<>,.?/~")),  
            # Số khoảng trắng
            query.count(" "),  
            # Số ký tự đặc biệt
            sum(1 for char in query if not char.isalnum() and char != " ")  # 
        ]
    ], dtype=np.float32)

    # Kết hợp đặc trưng
    combined_features = np.hstack((text_features, numeric_features))

    # Chuẩn hóa (nếu có dùng scaler)
    combined_features = scaler.transform(combined_features)

    return combined_features.astype(np.float32)

@app.get("/")
async def hello():
    return {"message": "Hello World"}


@app.post("/detect")
async def detect_sql_injection(request: QueryRequest):
    input_data = preprocess(request.query)
    result = session.run(None, {"float_input": input_data})[0][0]
    return {"is_sql_injection": float(result)}

if __name__ == "__main__":
    import uvicorn
    host = "localhost"
    port = 7000
    print(f"Server is running at: http://localhost:{port}")
    uvicorn.run(app, host=host, port=port)
