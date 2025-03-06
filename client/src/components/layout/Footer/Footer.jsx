import React from "react";

export default function Footer() {
  return (
    <footer className="bg-color-custom-1 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold font-font1 text-color-custom-2">
              PETACILIOUS
            </h2>
          </div>

          <div>
            <h3 className="text-lg text-color-custom-2 font-semibold mb-2">
              Dịch Vụ
            </h3>
            <ul className="space-y-1 text-color-custom-2">
              <li>Trang Trí</li>
              <li>Cung Câp Hoa Tươi</li>
              <li>Đặt Hoa Theo Yêu Cầu</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-color-custom-2">
              Các Loại Hoa
            </h3>
            <ul className="space-y-1 text-color-custom-2">
              <li>Hoa Nhập Khẩu</li>
              <li>Hoa Tươi</li>
              <li>Hoa Khô</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-color-custom-2">
              Hỗ Trợ
            </h3>
            <ul className="space-y-1 text-color-custom-2">
              <li>Tư Vấn Chọn Hoa</li>
              <li>Hỗ Trợ Chăm Sóc</li>
              <li></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-color-custom-2">
              Company
            </h3>
            <ul className="space-y-1 text-color-custom-2">
              <li>Địa Chỉ: Số 1 Phù Đổng Thiên Vương</li>
              <li>Liên Hệ: 0123 456 789</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 flex justify-between items-center text-color-custom-2">
          <p>PETACILIOUS Inc. © 2025</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-color-custom-2">
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
                class="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-color-custom-2">
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
                class="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-color-custom-2">
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
                class="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <a href="#" className="text-gray-400 hover:text-color-custom-2">
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
                class="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
