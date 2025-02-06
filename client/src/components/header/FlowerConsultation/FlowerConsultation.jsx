import { useState } from "react";

const FlowerConsultation = () => {
  const [theme, setTheme] = useState("birthday");
  const [price, setPrice] = useState("all");

  return (
    <div className="text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-center text-xl font-bold mb-4 text-color-custom-2">
        TƯ VẤN CHỌN HOA TƯƠI
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="mb-1">Chủ đề</label>
          <select
            className="p-2 text-color-custom-2 bg-color-custom-4 rounded-md border"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="birthday">Hoa sinh nhật</option>
            <option value="love">Hoa tình yêu</option>
            <option value="congratulations">Hoa chúc mừng</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Mức giá</label>
          <select
            className="p-2 text-color-custom-2 bg-color-custom-4 rounded-md border"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="low">Dưới 500K</option>
            <option value="medium">500K - 1 Triệu</option>
            <option value="high">Trên 1 Triệu</option>
          </select>
        </div>

        <button className="bg-color-custom-2 text-color-custom-1 font-bold py-2 rounded-md">
          Tìm kiếm
        </button>
      </div>

      <p className="text-sm mt-3 text-center text-black">
        *Bạn có thể gọi nhanh cho chúng tôi theo số{" "}
        <span className="text-color-custom-2 font-bold">0123 456 789</span> để
        đặt hoa theo thiết kế riêng
      </p>
    </div>
  );
};

export default FlowerConsultation;
