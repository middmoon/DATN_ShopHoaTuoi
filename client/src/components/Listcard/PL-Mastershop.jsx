import React, { useState, useEffect } from "react";
import ProductCard from "../Card/ProductCard";
import { getProduct } from "../../APIs/productAPI";

const PLMastershop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        if (response.status === 200) {
          console.log("Danh sách sản phẩm:", response.data);
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  // Chuyển đổi URL Google Drive
  const getDirectImageURL = (url) => {
    if (!url) return "https://via.placeholder.com/150?text=No+Image";
    const match = url.match(/(?:id=|\/d\/)([^/&?]+)/);
    return match
      ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000`
      : url;
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="PlSale mx-auto relative">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 relative">
        {displayedProducts.map((product) => {
          const avatarImage = getDirectImageURL(
            product.ProductImages?.find((img) => img.is_avatar)?.img_url ||
              product.ProductImages?.[0]?.img_url
          );

          return (
            <ProductCard
              key={product._id}
              image={avatarImage}
              name={product.name}
              price={
                product.retail_price
                  ? `${product.retail_price.toLocaleString("vi-VN")} VND`
                  : "Liên hệ"
              }
            />
          );
        })}
      </div>

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
