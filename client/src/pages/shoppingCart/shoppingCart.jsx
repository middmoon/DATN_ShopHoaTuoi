import React from "react";
import { useCart } from "../../context/cartContext";

// Hàm chuyển đổi URL Google Drive
const getDirectImageURL = (url) => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000` : url;
};

const CartPage = () => {
  const { cart } = useCart();

  const mergedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((prod) => prod.slug === item.slug);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const totalAmount = mergedCart.reduce(
    (total, item) => total + item.quantity * (item.retail_price || 0),
    0
  );

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">🛍 Giỏ hàng của bạn</h2>

      {mergedCart.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng trống.</p>
      ) : (
        <>
          <ul className="grid gap-4">
            {mergedCart.map((item, index) => (
              <li
                key={index}
                className="flex items-center bg-white shadow-md p-4 rounded-lg"
              >
                <img
                  src={getDirectImageURL(
                    item.ProductImages?.find((img) => img.is_avatar)?.img_url ||
                      item.ProductImages?.[0]?.img_url ||
                      "https://via.placeholder.com/150?text=No+Image"
                  )}
                  alt={item.name || "Không có tên"}
                  className="w-20 h-20 object-cover rounded-lg border"
                />

                <div className="ml-4">
                  <h3 className="text-lg font-semibold">
                    {item.name || "Không có tên"}
                  </h3>
                  <p className="text-gray-600">
                    Giá:{" "}
                    {item.retail_price
                      ? `${item.retail_price.toLocaleString()} VNĐ`
                      : "Chưa có giá"}
                  </p>
                  <p className="text-gray-600">Số lượng: {item.quantity}</p>
                  <p className="text-red-500 font-semibold">
                    Tổng:{" "}
                    {(
                      item.quantity * (item.retail_price || 0)
                    ).toLocaleString()}{" "}
                    VNĐ
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 text-right">
            <h3 className="text-xl font-bold">
              💰 Tổng tiền: {totalAmount.toLocaleString()} VNĐ
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
