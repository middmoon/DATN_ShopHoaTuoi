import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CategoryCard from "../../Card/CategoryCard";

export default function ReviewService() {
  const categories = [
    { id: 1, image: "/Img/Page/p2.jpg", name: "Hoa Sự Kiện" },
    { id: 2, image: "/Img/Page/p2.jpg", name: "Category 2" },
    { id: 3, image: "/Img/Page/p2.jpg", name: "Category 3" },
    { id: 4, image: "/Img/Page/p2.jpg", name: "Category 4" },
    { id: 5, image: "/Img/Page/p2.jpg", name: "Category 5" },
    { id: 6, image: "/Img/Page/p2.jpg", name: "Category 6" },
    { id: 7, image: "/Img/Page/p2.jpg", name: "Category 7" },
    { id: 8, image: "/Img/Page/p2.jpg", name: "Category 8" },
    { id: 9, image: "/Img/Page/p2.jpg", name: "Category 9" },
    { id: 10, image: "/Img/Page/p2.jpg", name: "Category 10" },
  ];

  return (
    <div className="ReviewService bg-color-custom-4">
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold  font-font4">Dịch Vụ Cung Cấp</h1>
      </div>

      <div className="container mx-auto pb-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={5}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 5 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            320: { slidesPerView: 1 },
          }}
          className="!pb-10"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id + category.name}>
              <CategoryCard image={category.image} name={category.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
