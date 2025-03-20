import React from "react";

const IntroduceShop = () => {
  return (
    <div className="introduce px-11 min-h-50vh flex items-center justify-center py-10 bg-cover bg-center relative">
      <div className="absolute top-0 left-0 w-full h-full bg-color-custom-2"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 relative">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-color-custom-1 font-font3 mb-4">
            Chào Mừng Đến Với Petacilious
          </h2>
          <p className="text-gray-700 font-font4 text-sm md:text-base leading-relaxed">
            Petacilious là trang web chuyên cung cấp các sản phẩm và dịch vụ hoa
            tươi độc đáo, tinh tế cho mọi dịp đặc biệt trong cuộc sống. Với sự
            đa dạng về kiểu dáng và thiết kế sáng tạo, Petacilious mang đến
            những bó hoa, lẵng hoa được chăm chút tỉ mỉ, thể hiện tình cảm chân
            thành và phong cách cá nhân. Dịch vụ đặt hàng trực tuyến dễ dàng,
            giao hoa tận nơi nhanh chóng và chính sách chăm sóc khách hàng chu
            đáo chính là những điểm nhấn giúp Petacilious trở thành lựa chọn lý
            tưởng để gửi gắm yêu thương qua những bông hoa tươi thắm.
          </p>
        </div>
        <div className="flex-1 relative">
          <img
            src="/Img/Page/p7.webp"
            alt="Large Flower"
            className="w-full rounded-lg shadow-lg border-4 border-white"
            style={{ height: "50%" }}
          />

          <img
            src="/Img/Page/p7.webp"
            alt="Small Flower"
            className="w-1/2 absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 rounded-lg shadow-lg border-4 border-white"
            style={{ height: "50%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroduceShop;
