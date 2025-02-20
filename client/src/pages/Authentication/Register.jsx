import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="flex-1 font-font1 text-3xl font-bold text-black text-center">
              <a href="/">PETACILIOUS</a>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">
            Chào mừng trở lại Petacilious
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Nhập thông tin để đăng ký tài khoản.
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên Đăng Nhập</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nhập địa chỉ email"
              />
            </div>
            {/* Trường Mật khẩu */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    // SVG icon for visible password
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-eye"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    // SVG icon for hidden password
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-eye-closed"
                    >
                      <path d="m15 18-.722-3.25" />
                      <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                      <path d="m20 15-1.726-2.05" />
                      <path d="m4 15 1.726-2.05" />
                      <path d="m9 18 .722-3.25" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Trường Nhập lại mật khẩu */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Nhập Lại Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Nhập lại mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    // SVG icon for visible password
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-eye"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    // SVG icon for hidden password
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-eye-closed"
                    >
                      <path d="m15 18-.722-3.25" />
                      <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                      <path d="m20 15-1.726-2.05" />
                      <path d="m4 15 1.726-2.05" />
                      <path d="m9 18 .722-3.25" />
                    </svg>
                  )}
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
            Tôi Đã Có Tài Khoản{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Đăng Nhập
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
                src="/Img/Page/p4.jpg"
                alt="Slide 1"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="h-full w-full">
              <img
                src="/Img/Page/p5.jpg"
                alt="Slide 2"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide>
            <div className="h-full w-full">
              <img
                src="/Img/Page/p6.jpg"
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
