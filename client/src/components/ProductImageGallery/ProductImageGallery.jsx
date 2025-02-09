import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductImageGallery() {
  const [mainImage, setMainImage] = useState("/Img/Background/2.jpg");
  const thumbnails = [
    "/Img/Background/2.jpg",
    "/Img/Background/3.jpg",
    "/Img/Background/3.png",
    "/Img/Background/4.jpg",
    "/Img/Background/5.jpg",
    "/Img/Background/6.jpg",
  ];

  return (
    <div className="lg:col-span-5 flex flex-col items-center">
      {/* Main Image */}
      <div className="flex w-full pt-5 bg-color-custom-1 border justify-center items-center">
        <img
          src={mainImage}
          alt="Main product"
          className="w-[90%] h-[500px] bg-color-custom-2 object-contain rounded-lg border"
        />
      </div>
      {/* Thumbnail Swiper */}
      <div className="w-full py-10 px-4 bg-color-custom-4">
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          className="h-[100px]" // 👈 Thiết lập chiều cao cho Swiper
        >
          {thumbnails.map((src, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center h-full"
            >
              <img
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full max-h-[80px] rounded-lg border cursor-pointer object-cover"
                onClick={() => setMainImage(src)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
