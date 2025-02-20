import React from "react";

const benefits = [
  {
    img: "/Img/Icon/free-ship.png",
    title: "Miễn Phí Vận Chuyển",
    desc: "Free Shipping ( nội thành )",
  },
  {
    img: "/Img/Icon/service.png",
    title: "Phục vụ 24/7",
    desc: "24/7 Customer Service",
  },
  {
    img: "/Img/Icon/vat.png",
    title: "Đã bao gồm 10% VAT",
    desc: "Price Includes 10% VAT",
  },
  {
    img: "/Img/Icon/clock.png",
    title: "Giao nhanh trong 60 phút",
    desc: "60 Minute Fast Delivery",
  },
  {
    img: "/Img/Icon/guarantee.png",
    title: "Cam Kết Hài Lòng 100%",
    desc: "100% Satisfaction Guarantee",
  },
  {
    img: "/Img/Icon/fresh.png",
    title: "Cam Kết Hoa Tươi 3+ Ngày",
    desc: "3+ Days Freshness Guarantee",
  },
  {
    img: "/Img/Icon/greatee.png",
    title: "Tặng Thiệp Cao Cấp",
    desc: "Free Greeting Card",
  },
  {
    img: "/Img/Icon/discount.png",
    title: "Giảm Giá Đến 10%",
    desc: "Reduction Up To 10%",
  },
];

export default function WhyChoiceMe() {
  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-xl pt-5 text-color-custom-2 font-bold text-center">
          Tại sao chọn chúng tôi?
        </h2>
      </div>
      <div className="col-span-3 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 text-left">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-4 py-6">
              <img
                src={benefit.img}
                alt={benefit.title}
                className="w-12 h-12"
              />
              <div>
                <p className="text-lg font-bold text-gray-800">
                  {benefit.title}
                </p>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
