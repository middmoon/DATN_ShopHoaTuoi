import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";

const slides = [
  {
    image: "/Img/Page/p7.webp",
    title: "Hoa Hồng",
    text: "Loài hoa quyến rũ với vẻ đẹp kiêu sa và hương thơm nồng nàn...",
  },
  { image: "/Img/Page/p7.webp", title: "Slide 2", text: "Nội dung slide 2" },
  { image: "/Img/Page/p7.webp", title: "Slide 3", text: "Nội dung slide 3" },
  { image: "/Img/Page/p7.webp", title: "Slide 4", text: "Nội dung slide 4" },
  { image: "/Img/Page/p7.webp", title: "Slide 5", text: "Nội dung slide 5" },
  { image: "/Img/Page/p7.webp", title: "Slide 6", text: "Nội dung slide 6" },
  { image: "/Img/Page/p7.webp", title: "Slide 7", text: "Nội dung slide 7" },
  { image: "/Img/Page/p7.webp", title: "Slide 8", text: "Nội dung slide 8" },
];

export default function Meaning() {
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);

  return (
    <div className="container mx-auto">
      <div className="w-full bg-color-custom-2 p-5 flex">
        {/* Phần danh sách bên trái với thanh cuộn */}
        <div
          className="w-1/4 p-4 border-gray-300 custom-scrollbar"
          style={{
            overflowY: "auto",
            maxHeight: "300px",
          }}
        >
          <style>
            {`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
            `}
          </style>
          <ul className="space-y-4">
            {slides.map((slide, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 rounded-lg transition-all duration-300 ${
                  selectedSlide === slide ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => setSelectedSlide(slide)}
              >
                <div className="relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-16 object-cover rounded mb-2"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                    <p className="text-white text-sm font-medium">
                      {slide.title}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Phần hiển thị nội dung bên phải */}
        <div className="w-3/4 p-4 flex flex-col items-center relative">
          <div className="relative">
            <img
              src={selectedSlide.image}
              alt={selectedSlide.title}
              className="w-[500px] h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <h2 className="text-white text-xl font-bold text-center">
                {selectedSlide.title}
              </h2>
            </div>
          </div>
          <p className="mt-2 text-lg text-center">{selectedSlide.text}</p>
        </div>
      </div>
    </div>
  );
}
