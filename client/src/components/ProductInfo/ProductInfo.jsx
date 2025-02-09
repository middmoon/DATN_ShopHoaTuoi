import { useState } from "react";
import StarRating from "../StarRating/StarRating";
import Divider from "../Divider/Divider";

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
  description:
    "Một bó hoa tươi đẹp, thích hợp làm quà tặng sinh nhật hoặc trang trí không gian sống.",
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
      {/* Tên sản phẩm */}
      <div>
        <h2 className="text-3xl font-bold">{productData.name}</h2>

        {/* Đánh giá sao */}
        <div className="flex items-center space-x-2 my-3">
          <StarRating rating={productData.rating} />
          <span className="text-gray-500">
            ({productData.reviews} đánh giá)
          </span>
        </div>

        {/* Giá sản phẩm */}
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
        {/* Mô tả sản phẩm */}
        <p className="text-gray-600 mt-4">{productData.description}</p>
      </div>
      <Divider />
      {/* Kích thước sản phẩm */}
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

      {/* Categories dưới dạng nút bấm */}
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

      {/* Chọn số lượng và tổng giá */}
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
        {/* Nút thêm vào giỏ hàng và mua ngay */}
        <div className="flex space-x-4">
          <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
            Thêm vào giỏ hàng
          </button>
          <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
            Mua ngay
          </button>
        </div>
      </div>

      {/* Miễn phí vận chuyển */}
      <p className="text-sm text-gray-500">
        Miễn phí vận chuyển vào tuần của ngày 14 tháng 2.
      </p>
      <div className="col-span-3 mt-12">
        <div className="flex items-center justify-between space-x-6">
          <div className="flex flex-col items-center">
            <img src="/icons/safe.png" alt="An toàn" className="w-8 h-8" />
            <p className="text-sm text-gray-600">An toàn & Không độc hại</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/icons/dermatologist.png"
              alt="Bác sĩ da liễu khuyên dùng"
              className="w-8 h-8"
            />
            <p className="text-sm text-gray-600">Bác sĩ da liễu khuyên dùng</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/icons/biodegradable.png"
              alt="Phân hủy sinh học"
              className="w-8 h-8"
            />
            <p className="text-sm text-gray-600">
              Thành phần phân hủy sinh học
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/icons/vegan.png" alt="Thuần chay" className="w-8 h-8" />
            <p className="text-sm text-gray-600">
              Thuần chay & Không thử nghiệm trên động vật
            </p>
          </div>
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="mt-8">
          <h3 className="text-xl font-bold">Chi tiết</h3>
          <p className="text-gray-600">{productData.description}</p>
        </div>
      </div>
    </div>
  );
}
