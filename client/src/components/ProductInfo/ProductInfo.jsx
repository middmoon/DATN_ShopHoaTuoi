import { useState } from "react";
import StarRating from "../StarRating/StarRating";
import Divider from "../common/Divider/Divider";
import ButtonAddToCard from "../common/Button/buttonAddToCard";

export default function ProductInfo({ product }) {
  // Định nghĩa state trước khi kiểm tra điều kiện
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Loading...</p>;

  const totalPrice = product.retail_price * quantity;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="lg:col-span-7 space-y-6 p-5 bg-color-custom-1 rounded-xl border border-gray-200">
      <div>
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <div className="flex items-center space-x-2 my-3">
          <StarRating rating={product.rating || 4.5} />
          <span className="text-gray-500">
            ({product.reviewsCount || 100} đánh giá)
          </span>
        </div>
        <div className="mt-2">
          <p
            className={`text-md font-medium py-1 rounded-lg w-fit ${
              product.status === "Còn hàng"
                ? " text-green-500 "
                : " text-red-500 "
            }`}
          >
            Trạng thái: {product.status}
          </p>
        </div>

        <div className="text-2xl font-bold">
          <span className="text-blue-500 text-lg mr-2">
            {product.retail_price.toLocaleString("vi-VN")}đ
          </span>
        </div>
        <p className="text-gray-600 mt-4">{product.description}</p>
      </div>

      <Divider />

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Danh mục:</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {product.ProductCategories?.map((category) => (
            <li
              key={category._id}
              className="transition-colors duration-200 hover:text-purple-600 hover:font-semibold"
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      {/* Số lượng sản phẩm */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            className="px-6 py-2 border rounded-lg"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="px-6 py-2 border rounded-lg"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>

        {/* Hiển thị tổng giá dựa trên số lượng */}
        <p className="text-lg font-bold text-red-600 bg-gray-100 p-2 rounded-lg">
          Tổng: {totalPrice.toLocaleString("vi-VN")}đ
        </p>

        <Divider />

        <div className="flex space-x-4">
          <ButtonAddToCard
            text={"Thêm vào giỏ hàng"}
            type="text"
            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
          />
          <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
