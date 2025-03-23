import React, { useState } from "react";
import Header from "../../components/layout/header/header";
import RotatingText from "../../components/ReactBit/RotatingText";
import "./test.css";

const Test = () => {
  return (
    <>
      <div className="h-[10vh]">
        <Header />
      </div>
      <div className="flex flex-col md:flex-row items-center p-8 md:p-16 gap-x-16 h-[90vh]">
        <div className="flex items-center justify-center h-full md:w-1/2 overflow-hidden">
          <div className="grid grid-cols-3 gap-10 p-6 h-full">
            {/* Left Column */}
            <div className="flex flex-col items-center gap-4 h-full overflow-hidden">
              <div className="w-36 h-[350px] bg-green-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://via.placeholder.com/80"
                  className="rounded-xl object-cover"
                  alt="Flower Girl"
                />
              </div>
              <div className="w-36 h-36 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-6 h-6 bg-black rounded"></div>
              </div>
              <div className="w-36 h-64 bg-black rounded-full overflow-hidden"></div>
            </div>

            {/* Center Column */}
            <div className="flex flex-col items-center gap-4 h-full overflow-hidden">
              <div className="w-36 h-36 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-6 h-6 bg-black rounded"></div>
              </div>
              <div className="w-36 h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://via.placeholder.com/100"
                  className="rounded-xl object-cover"
                  alt="Hand with Flower"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center gap-4 h-full overflow-hidden">
              <div className="w-36 h-80 bg-pink-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://via.placeholder.com/80"
                  className="rounded-xl object-cover"
                  alt="Flower Girl"
                />
              </div>
              <div className="w-36 h-36 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-6 h-6 bg-black rounded"></div>
              </div>
              <div className="w-36 h-80 bg-blue-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://via.placeholder.com/80"
                  className="rounded-xl object-cover"
                  alt="Flower Girl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Text & Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            PETACILIOUS
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
                rotationInterval={3000}
              />
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mt-4 text-lg">
            Quis imperdiet convallis fragilla a nulla at sit eget mauris. Nulla
            pretium enim in vestibulum.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold">
              All Collection
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              Shop Now <span className="text-xl">+</span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-8">
            <div className="text-center md:text-left">
              <span className="text-3xl font-bold text-gray-900">164K</span>
              <p className="text-gray-500 text-sm mt-1">Customer Reviews</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-3xl font-bold text-gray-900">231K</span>
              <p className="text-gray-500 text-sm mt-1">Flower Collection</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-3xl font-bold text-gray-900">12+</span>
              <p className="text-gray-500 text-sm mt-1">Store Location</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
