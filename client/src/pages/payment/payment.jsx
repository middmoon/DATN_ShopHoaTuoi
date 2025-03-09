import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import HeaderIn4 from "../../components/layout/header/headerin4";
import Navbar from "../../components/layout/header/navbar";

const PaymentPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    customer_phone: "",
    note: "",
    address: "",
    ward_name: "",
    ward_code: "",
    district_name: "",
    district_code: "",
    province_name: "",
    province_code: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const storedProducts = localStorage.getItem("selectedProducts");
    if (storedProducts) {
      setSelectedProducts(JSON.parse(storedProducts));
    }

    const storedCustomerInfo = localStorage.getItem("customerInfo");
    if (storedCustomerInfo) {
      setCustomerInfo(JSON.parse(storedCustomerInfo));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !customerInfo.customer_phone ||
      !customerInfo.customer_name ||
      !customerInfo.note ||
      !customerInfo.address ||
      !customerInfo.ward_name ||
      !customerInfo.district_name ||
      !customerInfo.province_name ||
      !customerInfo.ward_code ||
      !customerInfo.district_code ||
      !customerInfo.province_code ||
      selectedProducts.length === 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin và chọn ít nhất một sản phẩm!");
      return;
    }

    const dataToSend = {
      customer_phone: customerInfo.customer_phone,
      "customer-name": customerInfo.customer_name,
      note: customerInfo.note,
      address: customerInfo.address,
      ward_code: customerInfo.ward_code,
      ward_name: customerInfo.ward_name,
      district_code: customerInfo.district_code,
      district_name: customerInfo.district_name,
      province_code: customerInfo.province_code,
      province_name: customerInfo.province_name,
      products: selectedProducts.map((product) => ({
        _id: product._id,
        retail_price: product.retail_price,
        quantity: product.quantity,
      })),
    };

    if (paymentMethod === "vnpay") {
      try {
        const response = await fetch("http://localhost:3000/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        const result = await response.json();
        console.log("Kết quả phản hồi từ server:", result);

        if (response.ok) {
          alert("Dữ liệu đã được gửi đi thành công!");
          localStorage.removeItem("selectedProducts");
          navigate("/");
        } else {
          alert("Có lỗi xảy ra khi gửi dữ liệu.");
        }
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        alert("Không thể gửi dữ liệu. Vui lòng thử lại.");
      }
    } else {
      alert("Đặt hàng thành công, chờ thanh toán khi nhận hàng!");
      navigate("/");
    }

    localStorage.setItem("customerInfo", JSON.stringify(dataToSend));
  };

  return (
    <div className="container mx-auto p-5">
      <div className="pb-10">
        <HeaderIn4 />
        <Navbar />
      </div>
      <div className="bg-white p-5 border shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-3">Thanh toán</h2>

        {/* Form nhập thông tin khách hàng */}
        <h3 className="text-lg font-semibold">Thông tin khách hàng</h3>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-gray-700">Họ và tên</label>
            <input
              type="text"
              name="customer_name"
              value={customerInfo.customer_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div>
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="customer_phone"
              value={customerInfo.customer_phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Ghi chú đơn hàng</label>
            <textarea
              name="note"
              value={customerInfo.note}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-20 resize-none"
              placeholder="Nhập ghi chú (nếu có)"
            />
          </div>
        </div>

        {/* Địa chỉ giao hàng */}
        <h3 className="text-lg font-semibold mt-5">Địa chỉ giao hàng</h3>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-gray-700">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập địa chỉ cụ thể"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phường/Xã</label>
            <input
              type="text"
              name="ward_name"
              value={customerInfo.ward_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập phường/xã"
            />
          </div>
          <div>
            <label className="block text-gray-700">Quận/Huyện</label>
            <input
              type="text"
              name="district_name"
              value={customerInfo.district_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập quận/huyện"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tỉnh/Thành phố</label>
            <input
              type="text"
              name="province_name"
              value={customerInfo.province_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập tỉnh/thành phố"
            />
          </div>
        </div>

        {/* Mã phường, quận, tỉnh */}
        <h3 className="text-lg font-semibold mt-5">
          Mã Phường/Xã, Quận/Huyện, Tỉnh/Thành phố
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-gray-700">Mã Phường/Xã</label>
            <input
              type="text"
              name="ward_code"
              value={customerInfo.ward_code}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập mã phường/xã"
            />
          </div>
          <div>
            <label className="block text-gray-700">Mã Quận/Huyện</label>
            <input
              type="text"
              name="district_code"
              value={customerInfo.district_code}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập mã quận/huyện"
            />
          </div>
          <div>
            <label className="block text-gray-700">Mã Tỉnh/Thành phố</label>
            <input
              type="text"
              name="province_code"
              value={customerInfo.province_code}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nhập mã tỉnh/thành phố"
            />
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <h3 className="text-lg font-semibold mt-5 pb-5">Danh sách sản phẩm</h3>
        {selectedProducts.length === 0 ? (
          <p className="text-gray-500 text-center py-4 text-lg">
            Không có sản phẩm để thanh toán
          </p>
        ) : (
          <div className="border p-5 rounded-lg bg-gray-100 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Sản phẩm đã chọn
            </h3>
            <ul>
              {selectedProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-3"
                >
                  <span className="font-medium text-gray-800">
                    {product.name}
                  </span>
                  <span className="text-gray-600">
                    {product.quantity} x{" "}
                    <span className="text-red-500 font-semibold">
                      {product.retail_price.toLocaleString()} VNĐ
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Tính tổng tiền */}
            <div className="mt-4 pt-3 border-t border-gray-300 flex justify-between text-lg font-bold text-gray-800">
              <span>Tổng tiền:</span>
              <span className="text-red-500">
                {selectedProducts
                  .reduce(
                    (total, product) =>
                      total + product.quantity * product.retail_price,
                    0
                  )
                  .toLocaleString()}{" "}
                VNĐ
              </span>
            </div>
          </div>
        )}

        <div className="mb-4 pt-10">
          <label className="block text-gray-700 font-semibold mb-2">
            Phương thức thanh toán
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="vnpay">Thanh toán qua VNPay</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-5 px-5 py-2 bg-blue-500 text-white rounded-lg"
        >
          Xác nhận đặt hàng
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
