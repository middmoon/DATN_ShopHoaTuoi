import React from "react";

export default function HeaderIn4() {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-4">
      {/* Địa chỉ */}
      <div className="flex-1 font-font2 text-color-custom-2 text-left whitespace-nowrap">
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-[10px] xl:text-sm">
          Phù Đổng Thiên Vương / Đà Lạt / Lâm Đồng
        </p>
      </div>

      {/* Tiêu đề thương hiệu */}
      <div className="flex-1 font-font1 text-color-custom-2 text-center font-bold whitespace-nowrap">
        <a
          href="/"
          className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          PETACILIOUS
        </a>
      </div>

      {/* Số điện thoại */}
      <div className="flex-1 font-font2 text-color-custom-2 text-right whitespace-nowrap">
        <p className="text-[10px] sm:text-sm md:text-sm lg:text-sm xl:text-sm">
          0123 456 789
        </p>
      </div>
    </div>
  );
}
