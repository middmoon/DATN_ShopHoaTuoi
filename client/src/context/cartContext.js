import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);


  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.slug === product.slug);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  

  const increaseQuantity = (slug) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  

  // Giảm số lượng sản phẩm
  const decreaseQuantity = (slug) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  
  const removeFromCart = (slug) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.slug !== slug);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage
      return updatedCart;
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  
  
  

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
