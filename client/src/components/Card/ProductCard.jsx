import React from "react";

const ProductCard = ({ image, name, price, isSale, link, category }) => {
  return (
    <a href={link} className="w-full">
      <div className="bg-white rounded-2xl shadow-md p-4 w-full flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-lg border">
        <div className="relative w-full h-80">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
          {isSale && (
            <div className="absolute font-font4 top-0 left-0 bg-red-500 text-white px-3 py-1 rounded-br-xl text-sm">
              Giảm Giá
            </div>
          )}
        </div>

        <p className="mt-3 font-font3 text-center text-sm font-semibold text-gray-800 overflow-hidden whitespace-nowrap w-full">
          {name}
        </p>

        <p className="font-font3 text-center text-ml text-gray-800 mb-4">
          {price}
        </p>

        <button className="bg-color-custom-1 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all w-full">
          Mua ngay
        </button>
      </div>
    </a>
  );
};

export default ProductCard;
