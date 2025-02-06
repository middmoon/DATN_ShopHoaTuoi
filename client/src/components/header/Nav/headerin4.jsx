import React, { useState } from "react";

export default function HeaderIn4() {
  return (
    <>
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex-1 font-font2 text-sm text-color-custom-2 text-left">
          <p className="text-xs sm:text-sm">
            Phù Đổng Thiên Vương / Đà Lạt / Lâm Đồng
          </p>
        </div>

        <div className="flex-1 font-font1 text-2xl sm:text-3xl font-bold text-color-custom-2 text-center">
          <a>PETACILIOUS</a>
        </div>

        <div className="flex-1 font-font2 bg-color-custom-4 text-sm text-color-custom-2 text-right">
          <p className="text-xs sm:text-sm">0123 456 789</p>
        </div>
      </div>
    </>
  );
}
