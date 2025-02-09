import React, { useState } from "react";
import ProductCard from "../Card/ProductCard";

const PLMastershop = () => {
  const products = Array.from({ length: 80 }, (_, index) => ({
    id: index + 1,
    image: "/Img/Page/p2.jpg",
    name: `Product ${index + 1}`,
    price: `${1500000 + index * 100000}`,
    isSale: true,
  }));

  const itemsPerPage = 20; // Số sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="PlSale mx-auto relative">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 relative">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            isSale={product.isSale}
          />
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-color-custom-2 text-color-custom-1"
                  : "bg-color-custom-3 text-color-custom-2"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PLMastershop;
