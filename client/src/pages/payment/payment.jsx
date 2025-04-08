import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Sửa lỗi cú pháp: bỏ "data"
import { fetchProvinces, fetchDistricts, fetchWards } from "../../APIs/adress";
import apiv1 from "../../utils/axiosClient";

const PaymentPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [amount, setAmount] = useState(0);
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
    payment_method: 1,
  });
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();

  // Load dữ liệu từ localStorage khi component khởi tạo
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

  // Tính tổng tiền dựa trên giá sau khi giảm
  useEffect(() => {
    const totalAmount = selectedProducts.reduce((total, product) => {
      const price = calculateDiscountedPrice(product);
      return total + product.quantity * price;
    }, 0);
    setAmount(totalAmount);
  }, [selectedProducts]);

  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const getProvinces = async () => {
      const data = await fetchProvinces();
      setProvinces(data);
    };
    getProvinces();
  }, []);

  // Hàm tính giá sau khi giảm
  const calculateDiscountedPrice = (product) => {
    if (product.Events && product.Events.length > 0) {
      const event = product.Events[0]; // Lấy sự kiện giảm giá đầu tiên
      if (event.discount_type === "fixed") {
        return Math.max(product.retail_price - event.discount_value, 0);
      } else if (event.discount_type === "percentage") {
        return Math.max(product.retail_price - (product.retail_price * event.discount_value) / 100, 0);
      }
    }
    return product.retail_price || 0; // Nếu không có giảm giá, trả về retail_price
  };

  const handleProvinceChange = async (event) => {
    const provinceCode = event.target.value;
    const province = provinces.find((p) => p.code === provinceCode);

    setCustomerInfo((prev) => ({
      ...prev,
      province_name: province?.name || "",
      province_code: provinceCode,
      district_name: "",
      district_code: "",
      ward_name: "",
      ward_code: "",
    }));

    setDistricts([]);
    setWards([]);
    if (provinceCode) {
      const data = await fetchDistricts(provinceCode);
      setDistricts(data);
    }
  };

  const handleDistrictChange = async (event) => {
    const districtCode = event.target.value;
    const district = districts.find((d) => d.code === districtCode);

    setCustomerInfo((prev) => ({
      ...prev,
      district_name: district?.name || "",
      district_code: districtCode,
      ward_name: "",
      ward_code: "",
    }));

    setWards([]);
    if (districtCode) {
      const data = await fetchWards(districtCode);
      setWards(data);
    }
  };

  const handleWardChange = (event) => {
    const wardCode = event.target.value;
    const ward = wards.find((w) => w.code === wardCode);

    setCustomerInfo((prev) => ({
      ...prev,
      ward_name: ward?.name || "",
      ward_code: wardCode,
    }));
  };

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
      !customerInfo.ward_code ||
      !customerInfo.district_name ||
      !customerInfo.district_code ||
      !customerInfo.province_name ||
      !customerInfo.province_code ||
      selectedProducts.length === 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin và chọn ít nhất một sản phẩm!");
      return;
    }

    const dataToSend = {
      customer_name: customerInfo.customer_name,
      customer_phone: customerInfo.customer_phone,
      note: customerInfo.note,
      address: customerInfo.address,
      province_name: customerInfo.province_name,
      province_code: customerInfo.province_code,
      district_name: customerInfo.district_name,
      district_code: customerInfo.district_code,
      ward_name: customerInfo.ward_name,
      ward_code: customerInfo.ward_code,
      products: selectedProducts.map((product) => ({
        _id: product._id,
        retail_price: calculateDiscountedPrice(product), // Sử dụng giá sau khi giảm
        quantity: product.quantity,
      })),
      payment_method_id: Number(paymentMethod),
    };

    localStorage.setItem("customerInfo", JSON.stringify(dataToSend));

    switch (dataToSend.payment_method_id) {
      case 1:
        try {
          const createOrderResponse = await apiv1.post("/order", dataToSend);
          if (createOrderResponse.status !== 201) {
            throw new Error("Không thể tạo đơn hàng");
          }

          const orderData = createOrderResponse.data.data;
          const paymentData = {
            orderId: orderData.order._id,
            amount: orderData.order.total_price,
            language: orderData.payment.info.language,
            bankCode: "VNBANK",
            txnRef: orderData.payment.info.vnp_TxnRef,
            orderInfo: orderData.payment.info.vnp_OrderInfo,
          };

          const vnpayPaymentResponse = await apiv1.post("/payment/vnpay/create_payment_url", paymentData);
          if (vnpayPaymentResponse.status !== 200) {
            throw new Error("Không thể tạo URL thanh toán");
          }

          const data = vnpayPaymentResponse.data;
          window.location.href = data.paymentUrl;
        } catch (error) {
          console.error("Lỗi khi gửi dữ liệu:", error);
          if (error.message === "Dữ liệu không hợp lệ") {
            alert("Vui lòng kiểm tra lại thông tin đơn hàng.");
          } else {
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
          }
        }
        break;
      case 7:
        try {
          const createOrderResponse = await apiv1.post("/order", dataToSend);
          if (createOrderResponse.status !== 201) {
            throw new Error("Không thể tạo đơn hàng");
          }

          alert("Cảm ơn bạn đã đặt hàng hãy chờ nhân viên liên hệ.");
          navigate("/");
        } catch (error) {
          console.error("Lỗi khi gửi dữ liệu:", error);
          if (error.message === "Dữ liệu không hợp lệ") {
            alert("Vui lòng kiểm tra lại thông tin đơn hàng.");
          } else {
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="bg-white p-5 border shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-3">Thanh toán</h2>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label>Họ và tên</label>
            <input
              type="text"
              name="customer_name"
              value={customerInfo.customer_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="customer_phone"
              value={customerInfo.customer_phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
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

        <label>Địa chỉ cụ thể</label>
        <input type="text" name="address" value={customerInfo.address} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" />

        <div className="grid grid-cols-3 gap-4">
          <select value={customerInfo.province_code} onChange={handleProvinceChange} className="w-full p-2 border rounded">
            <option value="">Chọn tỉnh/thành</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={customerInfo.district_code}
            onChange={handleDistrictChange}
            disabled={!customerInfo.province_code}
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            value={customerInfo.ward_code}
            onChange={handleWardChange}
            disabled={!customerInfo.district_code}
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-5 border shadow-lg rounded-lg mt-5">
          <h2 className="text-xl font-bold mb-3">Thanh toán</h2>

          <h3 className="text-lg font-semibold mt-5 pb-5">Danh sách sản phẩm</h3>
          {selectedProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4 text-lg">Không có sản phẩm để thanh toán</p>
          ) : (
            <div className="border p-5 rounded-lg bg-gray-100 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Sản phẩm đã chọn</h3>
              <ul>
                {selectedProducts.map((product, index) => {
                  const price = calculateDiscountedPrice(product);
                  const hasDiscount = product.Events && product.Events.length > 0;

                  return (
                    <li key={index} className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-800">{product.name}</span>
                      <span className="text-gray-600">
                        {product.quantity} x{" "}
                        {hasDiscount ? (
                          <>
                            <span className="line-through text-gray-500">{product.retail_price.toLocaleString()} VNĐ</span>
                            <span className="text-red-500 ml-2">{price.toLocaleString()} VNĐ</span>
                          </>
                        ) : (
                          <span className="text-blue-500">{product.retail_price.toLocaleString()} VNĐ</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 pt-3 border-t border-gray-300 flex justify-between text-lg font-bold text-gray-800">
                <span>Tổng tiền:</span>
                <span className="text-red-500">{amount.toLocaleString()} VNĐ</span>
              </div>
            </div>
          )}

          <div className="mb-4 pt-10">
            <label className="block text-gray-700 font-semibold mb-2">Phương thức thanh toán</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded">
              <option value="7">Thanh toán khi nhận hàng (COD)</option>
              <option value="1">Thanh toán qua VNPay</option>
            </select>
          </div>

          <button onClick={handleSubmit} className="w-full mt-5 px-5 py-2 bg-blue-500 text-white rounded-lg">
            Xác nhận đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
