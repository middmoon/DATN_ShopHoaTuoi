import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import CategoryCard from "../../Card/CategoryCard";

const fakeFlowers = [
  { id: 1, name: "Hoa Hồng", image: "/Img/category/1.webp" },
  { id: 2, name: "Hoa Cúc", image: "/Img/category/2.webp" },
  { id: 3, name: "Hoa Lan", image: "/Img/category/3.webp" },
  { id: 4, name: "Hoa Sen", image: "/Img/category/4.webp" },
  { id: 5, name: "Hoa Tulip", image: "/Img/category/5.webp" },
  { id: 6, name: "Hoa Hướng Dương", image: "/Img/category/6.webp" },
  { id: 7, name: "Hoa Oải Hương", image: "/Img/category/7.webp" },
  { id: 8, name: "Hoa Bỉ Ngạn", image: "/Img/category/8.webp" },
];

export default function ReviewService() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(fakeFlowers);
  }, []);

  return (
    <div className="ReviewService bg-color-custom-4">
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold font-font4">Dịch Vụ Cung Cấp</h1>
      </div>

      <div className="container mx-auto pb-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            1024: { slidesPerView: 5 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            320: { slidesPerView: 1 },
          }}
          className="!pb-10"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id} className="text-center">
              <CategoryCard image={category.image} name={category.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
