import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CategoryCard from "../../Card/CategoryCard";
import { getCategories } from "../../../APIs/categoryAPI";

export default function ReviewService() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.status === 200) {
          const categoryData = response.data;

          const parentCategories = categoryData
            .filter((cat) => !cat.parent_id)
            .map((cat) => ({
              id: cat._id,
              name: cat.name,
            }));

          setCategories(parentCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="ReviewService bg-color-custom-4">
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold font-font4">Dịch Vụ Cung Cấp</h1>
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
            <SwiperSlide key={category.id}>
              <CategoryCard image={category.image} name={category.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
