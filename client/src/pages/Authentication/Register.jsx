import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import apiv1 from "../../utils/axiosClient";

export default function Register() {
  const EyeClosedIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-eye-closed"
    >
      <path d="m15 18-.722-3.25" />
      <path d="M2 8a10.645 10.645 0 0 0 20 0" />
      <path d="m20 15-1.726-2.05" />
      <path d="m4 15 1.726-2.05" />
      <path d="m9 18 .722-3.25" />
    </svg>
  );

  const EyeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-eye"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    let hasError = false;

    switch (name) {
      case "username":
        if (!/^[A-Za-z]{5,}$/.test(value)) {
          newErrors.username = "Tên đăng nhập phải có ít nhất 5 ký tự và không chứa số.";
          hasError = true;
        } else {
          delete newErrors.username;
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Email không hợp lệ.";
          hasError = true;
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!/^(?=.*[A-Z])(?=.*\d).{5,}$/.test(value)) {
          newErrors.password = "Mật khẩu phải có ít nhất 5 ký tự, gồm chữ in hoa và số.";
          hasError = true;
        } else {
          delete newErrors.password;
        }

        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Mật khẩu không khớp.";
          hasError = true;
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Mật khẩu không khớp.";
          hasError = true;
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return hasError;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors =
      validateField("username", formData.username) |
      validateField("email", formData.email) |
      validateField("password", formData.password) |
      validateField("confirmPassword", formData.confirmPassword);

    if (hasErrors || Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiv1.post("/auth/register", {
        // Nếu cần gửi username thì bật dòng này lên:
        // username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Đăng ký thành công!");
      window.location.href = "/login";
    } catch (error) {
      const msg = error?.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      alert(msg);
      console.error("Đăng ký lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="flex-1 font-font1 text-3xl font-bold text-color-custom-1 text-center">
              <a href="/">PETACILIOUS</a>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">Chào mừng trở lại Petacilious</h1>
          <p className="text-gray-600 text-center mb-6">Nhập thông tin để đăng ký tài khoản.</p>

          <form onSubmit={handleSubmit}>
            {/* <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên Đăng Nhập</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập tên đăng nhập"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div> */}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nhập Lại Mật khẩu</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Nhập lại mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeIcon /> : <EyeClosedIcon />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-600">
                  Nhớ Tài Khoản
                </label>
              </div>
              <button className="text-color-custom-1 hover:underline">Quên Mật Khẩu?</button>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {loading ? "Đang đăng ký..." : "Đăng Ký"}
            </button>
          </form>

          <p className="text-center mt-6">
            Tôi Đã Có Tài Khoản{" "}
            <a href="/login" className="text-color-custom-1 hover:underline">
              Đăng Nhập
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
          {[1, 2, 3].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full">
                <img src="/Img/Page/p7.webp" alt={`Slide ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
