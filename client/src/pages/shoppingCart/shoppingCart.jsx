import React, { useState } from "react";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";

import HeaderIn4 from "../../components/layout/header/headerin4";
import Navbar from "../../components/layout/header/navbar";
import Divider from "../../components/common/Divider/Divider";

const getDirectImageURL = (url) => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000` : url;
};

const CartPage = () => {
  const {
    cart = [],
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({});
  const handleCheckboxChange = (slug) => {
    setSelectedItems((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };
  const handleCheckout = () => {
    // Lọc các sản phẩm đã chọn
    const selectedProducts = mergedCart.filter(
      (item) => selectedItems[item.slug]
    );

    // Lưu sản phẩm đã chọn vào localStorage
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));

    // Xóa sản phẩm đã chọn khỏi giỏ hàng trong cartContext và localStorage
    selectedProducts.forEach((item) => {
      // Gọi removeFromCart để xóa sản phẩm khỏi giỏ hàng (cartContext)
      removeFromCart(item.slug);
    });

    // Điều hướng sang trang thanh toán
    navigate("/payment");
  };

  const mergedCart = Array.isArray(cart)
    ? cart.reduce((acc, item) => {
        const existingItem = acc.find((prod) => prod.slug === item.slug);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, [])
    : [];
  const selectedTotalAmount = mergedCart.reduce((total, item) => {
    if (selectedItems[item.slug]) {
      return total + item.quantity * (item.retail_price || 0);
    }
    return total;
  }, 0);

  return (
    <div className="container mx-auto p-5">
      <HeaderIn4 />
      <Navbar />
      <div className="pt-10">
        {mergedCart.length === 0 ? (
          <p className="text-gray-500">Giỏ hàng trống.</p>
        ) : (
          <div className="grid grid-cols-10 gap-4">
            {/* Cột sản phẩm (70%) */}
            <div className="col-span-7 bg-color-custom-4 p-5 shadow-lg rounded-lg">
              <ul className="space-y-4">
                {mergedCart.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="flex items-center w-full">
                      <div className="w-1/12 flex justify-center">
                        <input
                          type="checkbox"
                          checked={selectedItems[item.slug] || false}
                          onChange={() => handleCheckboxChange(item.slug)}
                          className="mr-4"
                        />
                      </div>
                      <div className="w-2/12 flex justify-center">
                        <img
                          src={getDirectImageURL(
                            item.ProductImages?.find((img) => img.is_avatar)
                              ?.img_url ||
                              item.ProductImages?.[0]?.img_url ||
                              "https://via.placeholder.com/150?text=No+Image"
                          )}
                          alt={item.name || "Không có tên"}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      </div>
                      <div className="w-3/12">
                        <h3 className="text-lg font-semibold">
                          {item.name || "Không có tên"}
                        </h3>
                        <p className="text-gray-600">
                          Giá:{" "}
                          {item.retail_price
                            ? `${item.retail_price.toLocaleString()} VNĐ`
                            : "Chưa có giá"}
                        </p>
                      </div>
                      <div className="w-2/12 flex items-center">
                        <button
                          onClick={() => decreaseQuantity(item.slug)}
                          className="px-3 py-1 bg-color-custom-1 border text-black rounded-lg"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-minus"
                          >
                            <path d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.slug)}
                          className="px-3 py-1 bg-color-custom-1 border text-black rounded-lgtext-black rounded-lg"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-plus"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </button>
                      </div>
                      <div className="w-2/12 text-red-500 font-semibold">
                        {(
                          item.quantity * (item.retail_price || 0)
                        ).toLocaleString()}{" "}
                        VNĐ
                      </div>
                      <div className="w-2/12 flex justify-center">
                        <button
                          onClick={() => removeFromCart(item.slug)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-x"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>
                    </li>
                    {index < mergedCart.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            <div className="col-span-3 bg-color-custom-5 p-5 shadow-lg rounded-lg text-right">
              <h3 className="text-xm font-bold mb-3">Thành tiền</h3>
              {mergedCart.map(
                (item, index) =>
                  selectedItems[item.slug] && (
                    <p
                      key={index}
                      className="text-color-custom-7 font-semibold py-2"
                    >
                      {item.name}:{" "}
                      {(
                        item.quantity * (item.retail_price || 0)
                      ).toLocaleString()}{" "}
                      VNĐ
                    </p>
                  )
              )}
              <hr className="my-3" />
              <h3 className="text-xl font-bold text-color-custom-2">
                Tổng tiền: {selectedTotalAmount.toLocaleString()} VNĐ
              </h3>
              <button
                onClick={handleCheckout}
                className="w-full mt-10 px-5 py-2 bg-green-500 text-white rounded-lg"
              >
                Thanh toán ngay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
