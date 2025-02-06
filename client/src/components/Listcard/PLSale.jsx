import React from "react";
import ProductCard from "../Card/ProductCard";

const PLSale = () => {
  const products = [
    {
      image: "/Img/Page/p2.jpg",
      name: "Cẩm Tú Cầu Và Em",
      price: "200,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 2",
      price: "150,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 3",
      price: "300,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 4",
      price: "180,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 5",
      price: "250,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 6",
      price: "320,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 7",
      price: "220,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 8",
      price: "190,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 9",
      price: "260,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 10",
      price: "200,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 11",
      price: "150,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 12",
      price: "280,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 13",
      price: "310,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 14",
      price: "230,000",
      isSale: true,
    },
    {
      image: "/Img/Page/p2.jpg",
      name: "Product 15",
      price: "270,000",
      isSale: true,
    },
  ];

  return (
    <div
      className="PlSale bg-cover bg-center mx-auto relative"
      style={{ backgroundImage: "url('/Img/Background/4.jpg')" }}
    >
      {/* Lớp phủ trắng */}
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-80"></div>

      {/* Nội dung chính */}
      <div className="container mx-auto py-10 text-center relative">
        <h1 className="text-2xl font-bold font-font4">Sản Phẩm Giảm Giá</h1>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-10 relative">
        {products.slice(0, 10).map((product, index) => (
          <ProductCard
            key={index}
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

export default PLSale;
