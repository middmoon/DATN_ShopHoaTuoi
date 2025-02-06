import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Test() {
  return (
    <div className="max-w-[1200px] h-[400px] mx-auto px-4 py-8 overflow-hidden">
      <div className="flex h-full gap-4">
        {/* Phần bên trái chiếm 60% */}
        <div className="basis-3/5 min-w-0 h-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="h-full w-full rounded-lg border-4 border-gray-300"
          >
            {[
              "Img/1.jpg",
              "Img/2.jpg",
              "Img/3.jpg",
              "Img/4.jpg",
              "Img/5.jpg",
            ].map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Phần bên phải chiếm 40% */}
        <div className="basis-2/5 min-w-0 flex flex-col gap-4 h-full">
          <div className="flex-1 bg-blue-100 p-4 rounded-lg flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-2">
              Dịch vụ giao hàng nhanh chóng
            </h2>
            <p className="text-lg">
              Đảm bảo giao hàng tận nơi trong thời gian ngắn nhất.
            </p>
          </div>

          <div className="flex-1 bg-green-100 p-4 rounded-lg flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Ưu đãi đặc biệt</h3>
            <p className="text-lg">
              Giảm giá lên đến 20% cho đơn hàng đầu tiên của bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
