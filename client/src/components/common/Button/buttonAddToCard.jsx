import React from "react";
import { useCart } from "../../../context/cartContext";

const ButtonAddToCard = ({ product, type, text, icon, className }) => {
  const { addToCart } = useCart();

  const handleClick = () => {
    console.log("Click Add To Cart", product);
    addToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-color-custom-6 text-white p-3 rounded-full hover:bg-color-custom-2 transition-all w-12 h-12 flex items-center justify-center ${className}`}
    >
      {type === "text" && text && (
        <span className="text-sm font-semibold">{text}</span>
      )}
      {type === "svg" && icon}
    </button>
  );
};

export default ButtonAddToCard;
