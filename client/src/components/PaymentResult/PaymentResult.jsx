import React from "react";
import { useLocation } from "react-router-dom";

function PaymentResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const error = query.get("error");

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {location.pathname === "/payment-success" ? (
        <div>
          <h2 style={{ color: "green" }}>Thanh toán thành công!</h2>
          <p>Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã được xử lý.</p>
        </div>
      ) : (
        <div>
          <h2 style={{ color: "red" }}>Thanh toán thất bại!</h2>
          <p>{error === "checksum" ? "Dữ liệu không hợp lệ, vui lòng thử lại." : "Thanh toán không thành công, vui lòng kiểm tra lại."}</p>
        </div>
      )}
      <button onClick={() => (window.location.href = "/")} style={{ padding: "10px 20px", marginTop: "20px" }}>
        Quay lại trang chủ
      </button>
    </div>
  );
}

export default PaymentResult;
