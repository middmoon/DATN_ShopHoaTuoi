# import pandas as pd
# import string
# import re
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import StandardScaler
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.pipeline import make_pipeline
# from sklearn.metrics import classification_report
# from sklearn.linear_model import LogisticRegression
# from sklearn.metrics import accuracy_score, classification_report
# from xgboost import XGBClassifier
# from sklearn.svm import SVC

# # Đọc file CSV
# df = pd.read_csv("/content/Modified_SQL_Dataset.csv")

# # Hàm kiểm tra có khoảng trắng hay không
# df["have_space"] = df["Query"].str.contains(r"\s", regex=True)

# # Hàm kiểm tra có ký tự đặc biệt hay không (không phải chữ cái, số, hoặc khoảng trắng)
# special_chars = re.compile(r"[^a-zA-Z0-9\s]")
# df["have_unique_text"] = df["Query"].apply(lambda x: bool(special_chars.search(str(x))))

# # Đếm số khoảng trắng trong câu
# df["count_space"] = df["Query"].str.count(r"\s")

# # Đếm số ký tự đặc biệt trong câu
# df["count_unique_text"] = df["Query"].apply(lambda x: len(re.findall(r"[^a-zA-Z0-9\s]", str(x))))

# # Hiển thị 5 dòng đầu để kiểm tra
# # print(df.head())

# print(df["Label"].value_counts())

# ######################################################################

# # Chuyển đổi cột Boolean thành số (True -> 1, False -> 0)
# df["have_space"] = df["have_space"].astype(int)
# df["have_unique_text"] = df["have_unique_text"].astype(int)

# vectorizer = TfidfVectorizer(max_features=1000)  # Giới hạn số lượng đặc trưng
# X_text_features = vectorizer.fit_transform(df["Query"]).toarray()

# y = df["Label"]

# # Gộp đặc trưng văn bản với các đặc trưng số
# X_numeric = df[["have_space", "have_unique_text", "count_space", "count_unique_text"]].values
# X_combined = np.hstack((X_text_features, X_numeric))

# X_train, X_test, y_train, y_test = train_test_split(X_combined, y, test_size=0.3, random_state=42)

# # Chuẩn hóa dữ liệu (tùy chọn, có thể bỏ qua)
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)
# X_test_scaled = scaler.transform(X_test)

# ######################################################################

# # Khởi tạo và huấn luyện mô hình
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X_train_scaled, y_train)


# # Dự đoán trên tập kiểm tra
# y_pred = model.predict(X_test_scaled)

# # Đánh giá độ chính xác
# accuracy = accuracy_score(y_test, y_pred)
# # print(f"Accuracy: {accuracy:.2f}")

# print(classification_report(y_test, y_pred))

# train_accuracy = model.score(X_train_scaled, y_train)
# test_accuracy = model.score(X_test_scaled, y_test)

# print(f"Train Accuracy: {train_accuracy:.4f} -- Test Accuracy: {test_accuracy:.4f}")

# ######################################################################

# logreg = LogisticRegression(max_iter=1000, random_state=42)
# logreg.fit(X_train_scaled, y_train)
# y_pred_logreg = logreg.predict(X_test_scaled)

# print("📌 Logistic Regression")
# print("Accuracy Logistic Regression:", accuracy_score(y_test, y_pred_logreg))
# print(classification_report(y_test, y_pred_logreg))

# train_accuracy = logreg.score(X_train_scaled, y_train)
# test_accuracy = logreg.score(X_test_scaled, y_test)

# print(f"Train Accuracy: {train_accuracy:.4f} -- Test Accuracy: {test_accuracy:.4f}")

# ######################################################################

# xgb = XGBClassifier(n_estimators=100, use_label_encoder=False, eval_metric='logloss', random_state=42)
# xgb.fit(X_train_scaled, y_train)
# y_pred_xgb = xgb.predict(X_test_scaled)

# print("📌 XGBoost")
# print("Accuracy XGBoost:", accuracy_score(y_test, y_pred_xgb))
# print(classification_report(y_test, y_pred_xgb))

# train_accuracy = xgb.score(X_train_scaled, y_train)
# test_accuracy = xgb.score(X_test_scaled, y_test)

# print(f"Train Accuracy: {train_accuracy:.4f} -- Test Accuracy: {test_accuracy:.4f}")

# ######################################################################

# svm = SVC(kernel="linear", random_state=42)
# svm.fit(X_train_scaled, y_train)
# y_pred_svm = svm.predict(X_test_scaled)

# print("📌 Support Vector Machine (SVM)")
# print("Accuracy Support Vector Machine (SVM):", accuracy_score(y_test, y_pred_svm))
# print(classification_report(y_test, y_pred_svm))

# train_accuracy = svm.score(X_train_scaled, y_train)
# test_accuracy = svm.score(X_test_scaled, y_test)

# print(f"Train Accuracy: {train_accuracy:.4f} -- Test Accuracy: {test_accuracy:.4f}")