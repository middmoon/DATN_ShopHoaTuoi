import { useState } from "react";
import StarRating from "../StarRating/StarRating";
import Divider from "../common/Divider/Divider";

const productData = {
  name: "Bó Hoa Tươi - Baby Flower",
  categories: [
    "Hoa sinh nhật",
    "Hoa tình yêu",
    "Hoa tặng người yêu",
    "Hoa tặng cho nữ",
    "Bó hoa tươi",
    "Baby flower",
    "Mẫu hồng",
  ],
  rating: 4.6,
  reviews: 214,
  sizes: [
    { size: "Vừa", price: { old: 20000, new: 16000 } },
    { size: "To", price: { old: 35000, new: 30000 } },
  ],
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);

  const handleQuantityChange = (operation) => {
    setQuantity((prev) =>
      operation === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const totalPrice =
    quantity * (selectedSize.price.new || selectedSize.price.old);

  return (
    <div className="lg:col-span-7 space-y-6 p-5 bg-color-custom-1 rounded-xl border border-gray-200">
      <div>
        <h2 className="text-3xl font-bold">{productData.name}</h2>
        <div className="flex items-center space-x-2 my-3">
          <StarRating rating={productData.rating} />
          <span className="text-gray-500">
            ({productData.reviews} đánh giá)
          </span>
        </div>
        <div className="text-2xl font-bold">
          <span className="line-through text-gray-400 text-lg mr-2">
            {formatCurrency(selectedSize.price.old)}
          </span>
          <span className="text-red-600">
            {formatCurrency(selectedSize.price.new)}
          </span>
          <span className="ml-2 text-green-600 text-sm">
            {(
              ((selectedSize.price.old - selectedSize.price.new) /
                selectedSize.price.old) *
              100
            ).toFixed(0)}
            % giảm
          </span>
        </div>
        <p className="text-gray-600 mt-4">{productData.description}</p>
      </div>
      <Divider />
      <div className="space-y-4">
        <p className="font-semibold">Kích thước:</p>
        <div className="flex space-x-4">
          {productData.sizes.map((size, index) => (
            <button
              key={index}
              className={`px-6 py-2 border rounded-lg ${
                selectedSize.size === size.size
                  ? "bg-green-100 text-green-700"
                  : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size.size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            className="px-6 py-2 border rounded-lg"
            onClick={() => handleQuantityChange("decrement")}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-6 py-2 border rounded-lg"
            onClick={() => handleQuantityChange("increment")}
          >
            +
          </button>
        </div>
        <p className="text-lg font-bold text-red-600 bg-gray-100 p-2 rounded-lg">
          Tổng: {formatCurrency(totalPrice)}
        </p>
        <Divider />
        <div className="flex space-x-4">
          <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
            Thêm vào giỏ hàng
          </button>
          <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
            Mua ngay
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <p className="font-semibold">Các nhóm hoa:</p>
        <div className="flex flex-wrap gap-4">
          {productData.categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 border rounded-full text-gray-600 hover:bg-gray-200"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="border p-4 rounded-lg bg-white">
        <h2 className="text-blue-600 font-bold text-lg mb-3">
          ƯU ĐÃI ĐẶC BIỆT
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-500 font-semibold mr-2">1.</span>
            Tặng Banner Hoặc Thiệp (Trị Giá 20.000đ - 50.000đ) Miễn Phí
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-semibold mr-2">2.</span>
            Giảm Tiếp 3% Cho Đơn Hàng Bạn Tạo ONLINE Lần Thứ 2, 5% Cho Đơn Hàng
            Bạn Tạo ONLINE Lần Thứ 6 Và 10% Cho Đơn Hàng Bạn Tạo ONLINE Lần Thứ
            12.
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-semibold mr-2">3.</span>
            Miễn Phí Giao Khu Vực Nội Thành ( )
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-semibold mr-2">4.</span>
            Giao Gấp Trong Vòng 2 Giờ
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-semibold mr-2">5.</span>
            Cam Kết 100% Hoàn Lại Tiền Nếu Bạn Không Hài Lòng
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-semibold mr-2">6.</span>
            Cam Kết Hoa Tươi Trên 3 Ngày
          </li>
        </ul>
      </div>
    </div>
  );
}
