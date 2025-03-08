import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo Context cho giỏ hàng
const CartContext = createContext();

// Hook để sử dụng giỏ hàng trong các component
export const useCart = () => useContext(CartContext);

// Component Provider để bọc toàn bộ ứng dụng
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load giỏ hàng từ localStorage khi mở trang
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    console.log("📥 Giỏ hàng tải từ localStorage:", storedCart);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("💾 Giỏ hàng đã lưu vào localStorage:", cart);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      console.log("🛒 Giỏ hàng sau khi thêm:", newCart);
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
