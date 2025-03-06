import React from "react";

const ProductCard = ({ image, name, price, isSale }) => {
  return (
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
        <button className="absolute bottom-2 right-2 bg-color-custom-6 text-white p-3 rounded-full hover:bg-color-custom-2  transition-all w-12 h-12 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-color-custom-2 hover:text-color-custom-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
      <p className="mt-3 font-font3 text-center text-sm font-semibold text-gray-800">
        {name}
      </p>
      <p className="font-font3 text-center text-ml text-gray-800 mb-4">
        {price} VNĐ
      </p>
      <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all w-full">
        Mua ngay
      </button>
    </div>
  );
};

export default ProductCard;
