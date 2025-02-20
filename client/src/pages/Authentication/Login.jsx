import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="flex-1 font-font1 text-3xl font-bold text-center">
              <a href="/">PETACILIOUS</a>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">
            Chào mừng trở lại Petacilious
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Nhập thông tin để đăng nhập tài khoản.
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nhập địa chỉ email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  👁
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-600">
                  Nhớ Tài Khoản
                </label>
              </div>
              <button className="text-blue-500 hover:underline">
                Quên Mật Khẩu?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Đăng Nhập
            </button>
          </form>
          <p className="text-center mt-6">
            Tôi Chưa Có Tài Khoản?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Tạo Tài Khoản
            </a>
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 text-white">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, type: "bullets" }}
          autoplay={{ delay: 10000 }}
          loop
          className="h-screen w-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="h-full w-full">
              <img
                src="/Img/Page/p1.jpg"
                alt="Slide 1"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="h-full w-full">
              <img
                src="/Img/Page/p2.jpg"
                alt="Slide 2"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide>
            <div className="h-full w-full">
              <img
                src="/Img/Page/p3.jpg"
                alt="Slide 3"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      ;
    </div>
  );
}
