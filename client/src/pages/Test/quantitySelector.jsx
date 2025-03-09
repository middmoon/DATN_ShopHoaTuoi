import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../APIs/productAPI";
import { useCart } from "../../context/cartContext";

const QuantitySelector = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      onAddToCart(quantity);
      setMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-lg font-semibold">Số lượng:</label>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) =>
          setQuantity(Math.max(1, parseInt(e.target.value) || 1))
        }
        className="w-20 p-2 border rounded-lg text-center"
      />
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleAddToCart}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Thêm {quantity} sản phẩm vào giỏ hàng
        </button>
      </div>
      {message && (
        <p className="mt-4 text-green-600 font-semibold">{message}</p>
      )}
    </div>
  );
};

export default QuantitySelector;
