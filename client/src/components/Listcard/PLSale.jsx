import React from "react";
import ProductCard from "../Card/ProductCard";

// Hàm tạo danh sách sản phẩm tự động
const generateProducts = (count = 15) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    image: "/Img/Page/p2.webp",
    name: `Sản Phẩm ${index + 1}`,
    price: `${150000 + index * 10000}`,
    isSale: true,
  }));
};

const PLSale = () => {
  const products = generateProducts(15);

  const saleProducts = products.filter((product) => product.isSale);

  return (
    <div className="PlSale bg-cover bg-center mx-auto">
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold font-font4">Sản Phẩm Giảm Giá</h1>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 pb-10 max-w-5xl">
        {saleProducts.slice(0, 9).map((product) => (
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

export default PLSale;
