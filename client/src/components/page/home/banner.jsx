import React from "react";
import RotatingText from "../../ReactBit/RotatingText";
import { motion } from "framer-motion";

export default function MainBanner() {
  const text =
    "Hoa không chỉ là một món quà, mà còn là một cách để thể hiện tình cảm của bạn. Một bó hoa tươi thắm có thể nói lên hàng ngàn lời yêu thương, sự trân trọng và lòng biết ơn. Tại cửa hàng hoa của chúng tôi, mỗi bông hoa đều được chọn lựa kỹ lưỡng, được chăm chút tỉ mỉ để mang đến cho bạn những sản phẩm chất lượng nhất. Chúng tôi hiểu rằng, mỗi dịp tặng hoa đều mang một ý nghĩa đặc biệt, vì vậy, chúng tôi luôn cố gắng để giúp bạn gửi gắm những thông điệp yêu thương một cách trọn vẹn nhất.";

  const smoothScrollTo = (targetY, duration = 800) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      window.scrollTo(0, startY + difference * progress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };
  return (
    <>
      {" "}
      <div className="flex flex-col md:flex-row items-center p-8 md:p-16 gap-x-16 h-[90vh]">
        <div className="flex items-center justify-center h-full md:w-1/2 overflow-hidden">
          <div className="grid grid-cols-3 gap-10 p-6 h-full">
            {/* Left Column */}
            <div className="flex flex-col items-center gap-4 h-full overflow-hidden">
              <div
                className="w-36 h-[350px] bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: "url('/Img/Page/p1.webp')",
                }}
              ></div>

              <div className="w-36 h-48 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
                <img src="/Img/Icon/fl3.png" alt="" className="w-12 h-12" />
              </div>
              <div
                className="w-36 h-64 rounded-full overflow-hidden bg-center bg-cover"
                style={{
                  backgroundImage: "url('/Img/Page/p2.webp')",
                }}
              ></div>
            </div>

            {/* Center Column */}
            <div className="flex flex-col items-center gap-4 h-full overflow-hidden">
              <div className="w-36 h-48 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
                <img src="/Img/Icon/fl2.png" alt="" className="w-12 h-12" />
              </div>
              <div
                className="w-36 h-[600px] bg-black rounded-full bg-center bg-cover"
                style={{
                  backgroundImage: "url('/Img/Page/p3.webp')",
                }}
              ></div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center gap-4 h-full overflow-hidden">
              <div
                className="w-36 h-80 rounded-full bg-center bg-cover"
                style={{
                  backgroundImage: "url('/Img/Page/p4.webp')",
                }}
              ></div>

              <div className="w-36 h-48 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
                <img src="/Img/Icon/fl1.png" alt="" className="w-12 h-12" />
              </div>

              <div
                className="w-36 h-80 rounded-full bg-center bg-cover"
                style={{
                  backgroundImage: "url('/Img/Page/p5.webp')",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <div className="text-5xl md:text-6xl font-bold font-font2 leading-tight">
            <div className="">
              PETA
              <span className="animated-gradient">CILIOUS</span>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="pb-0.5 sm:pb-3 md:pb-3">Cam kết</h1>
              <RotatingText
                texts={["Chất Lượng", "Giá Cả", "Uy Tín"]}
                mainClassName="text-color-custom-1 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-3 md:pb-3"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={5000}
              />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-gray-600 mt-4 text-lg">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <button
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105"
              onClick={() => smoothScrollTo(window.innerHeight * 0.9)}
            >
              Giới Thiệu
            </button>

            <button className="bg-color-custom-1 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              <a href="/mastershop">
                Mua Ngay <span className="text-xl">+</span>
              </a>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-8">
            <div className="text-center md:text-left">
              <span className="text-3xl font-bold text-gray-900">164</span>
              <p className="text-gray-500 text-sm mt-1">Đánh Giá</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-3xl font-bold text-gray-900">231</span>
              <p className="text-gray-500 text-sm mt-1">Đơn Hàng</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-3xl font-bold text-gray-900">12+</span>
              <p className="text-gray-500 text-sm mt-1">Phân Phối</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
