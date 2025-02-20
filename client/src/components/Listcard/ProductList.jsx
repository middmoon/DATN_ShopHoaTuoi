import React from "react";
import ProductCard from "../Card/ProductCard";

// Hàm tạo danh sách sản phẩm
const getProducts = (count = 80) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    image: "/Img/Page/p3.jpg",
    name: `Product ${index + 1}`,
    price: `${1500000 + index * 100000}`,
    isSale: false,
  }));
};

const ProductList = () => {
  const products = getProducts();

  return (
    <div
      className="PlSale bg-cover bg-center mx-auto "
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/Img/Background/7.jpg')",
      }}
    >
      <div className="container mx-auto py-10 text-center relative">
        <h1 className="text-2xl font-bold font-font4">Danh Sách Sản Phẩm</h1>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 pb-10 relative max-w-5xl">
        {products.slice(0, 9).map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            isSale={product.isSale}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
