import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageWithHotspot = ({ imageSrc, hotspots }) => {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="w-full h-auto flex flex-col items-center py-10 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Khám phá các loại hoa
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-2xl">
        Di chuột vào từng bó hoa để biết thêm thông tin chi tiết. Nhấn vào để
        xem thêm về từng loại hoa.
      </p>
      <div className="container mx-auto flex justify-center">
        <div className="relative inline-block w-full max-w-3xl">
          <img
            src={imageSrc}
            alt="Bó hoa"
            className="w-full h-auto max-w-3xl mx-auto rounded-lg shadow-md"
          />
          {hotspots.map((hotspot, index) => (
            <div
              key={index}
              className="absolute cursor-pointer"
              style={{
                top: hotspot.top,
                left: hotspot.left,
                width: hotspot.width,
                height: hotspot.height,
              }}
              onMouseEnter={() => setHoveredHotspot(hotspot)}
              onMouseLeave={() => setHoveredHotspot(null)}
              onClick={() => navigate(hotspot.href)}
            >
              {hoveredHotspot === hotspot && (
                <div
                  className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform duration-200"
                  style={{
                    transform: `translateY(10px)`,
                    left: "50%",
                    top: "100%",
                    minWidth: "150px",
                    maxWidth: "calc(100% - 20px)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textAlign: "center",
                    position: "absolute",
                    zIndex: 10,
                  }}
                >
                  <img
                    src={hotspot.image}
                    alt={hotspot.name}
                    className="w-28 h-28 object-cover rounded-md"
                  />
                  <p className="text-md font-semibold mt-2 text-center text-gray-800">
                    {hotspot.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 text-center">
                    {hotspot.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageWithHotspot;
