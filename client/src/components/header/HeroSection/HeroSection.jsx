import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../HeroSection/HeroSection.css";

import FlowerConsultation from "../FlowerConsultation/FlowerConsultation";

export default function HeroSection() {
  return (
    <>
      <div className="mx-auto h-[70%] my-10 overflow-hidden ">
        <div className="flex h-full gap-4">
          <div className="basis-3/5 min-w-0 h-full">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="h-full w-full rounded-lg"
            >
              {[
                "Img/Page/p1.jpg",
                "Img/Page/p2.jpg",
                "Img/Page/p3.jpg",
                "Img/Page/p4.jpg",
                "Img/Page/p5.jpg",
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

          <div className="basis-2/5 min-w-0 flex flex-col gap-4 h-full">
            <div className="flex-1 bg-color-custom-4 p-4 rounded-lg flex flex-col justify-center h-0 flex-grow-[7] border ">
              <FlowerConsultation></FlowerConsultation>
            </div>

            <div className="flex-1 bg-green-100 p-4 rounded-lg flex flex-col justify-center h-0 flex-grow-[3]">
              <h3 className="text-xl font-bold mb-4">Ưu đãi đặc biệt</h3>
              <p className="text-lg">
                Giảm giá lên đến 20% cho đơn hàng đầu tiên của bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
