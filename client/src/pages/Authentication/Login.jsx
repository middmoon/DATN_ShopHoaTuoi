import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import apiv1 from "../../utils/axiosClient";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await apiv1.post("/auth/login", {
        option: email,
        password,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("userEmail", email);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="flex-1 font-font1 text-3xl font-bold text-center text-color-custom-1">
              <a href="/">PETACILIOUS</a>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4 text-color-custom-3">Chào mừng trở lại Petacilious</h1>
          <p className="text-gray-600 text-center mb-6">Nhập thông tin để đăng nhập tài khoản.</p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-color-custom-1"
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-color-custom-1"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-color-custom-3 text-color-custom-4 py-2 rounded hover:bg-color-custom-1" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
          </form>

          <p className="text-center mt-6">
            Tôi Chưa Có Tài Khoản?{" "}
            <a href="/register" className="text-color-custom-1 hover:underline">
              Tạo Tài Khoản
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-gray-900 text-white">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, type: "bullets" }}
          autoplay={{ delay: 10000 }}
          loop
          className="h-screen w-full"
        >
          <SwiperSlide>
            <img src="/Img/Page/p7.webp" alt="Slide 1" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Img/Page/p7.webp" alt="Slide 2" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Img/Page/p7.webp" alt="Slide 3" className="h-full w-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
