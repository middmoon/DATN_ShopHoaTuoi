import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from "../Card/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const getProducts = (count = 80) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    image: "/Img/Page/p3.webp",
    name: `Product ${index + 1}`,
    price: `${1500000 + index * 100000}`,
    isSale: false,
  }));
};

const PLProductDetail = () => {
  const products = getProducts();

  return (
    <div className="PlSale bg-cover bg-center mx-auto">
      <div className="container mx-auto py-10 text-center relative">
        <h1 className="text-2xl font-bold font-font4">Danh Sách Sản Phẩm</h1>
      </div>

      <div className="container mx-auto pb-10 relative max-w-5xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          style={{ paddingBottom: "30px" }}
        >
          {products.slice(0, 20).map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                isSale={product.isSale}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PLProductDetail;
