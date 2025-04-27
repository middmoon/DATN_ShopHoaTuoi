import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageWithHotspot = ({ imageSrc, hotspots }) => {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const navigate = useNavigate();
  const [selectedFlower, setSelectedFlower] = useState(null);

  return (
    <div className="w-full flex justify-center">
      <div className="container w-full bg-color-custom-4 border rounded-lg h-auto flex items-center py-10">
        <div className="w-full bg-white p-6">
          <div className="flex">
            <div className="space-y-4 md:w-1/4 max-h-[43.5rem] overflow-y-auto pr-2  rounded-lg shadow-md">
              {hotspots.map((hotspots, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md cursor-pointer transition-all duration-200 ${
                    selectedFlower === hotspots ? "bg-blue-100 border-l-4 border-blue-500" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedFlower(hotspots)}
                >
                  <div className="flex items-center gap-3">
                    <img src={hotspots.image} alt={hotspots.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h3 className="font-medium text-gray-800">{hotspots.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{hotspots.meaning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col mx-auto hostpot">
              <div className="relative bg-color-custom-1">
                <img src={imageSrc} alt="Bó hoa" className="w-full max-h-[32rem]" />
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
                    onClick={() => {
                      setSelectedFlower(hotspot);
                    }}
                  ></div>
                ))}
              </div>
              {selectedFlower && (
                <div className="max-w-3xl mt-6 p-4 bg-color-custom-1 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={selectedFlower.image} alt={selectedFlower.name} className="w-16 h-16 rounded-md object-cover" />
                    <h3 className="text-lg font-semibold text-color-custom-4">{selectedFlower.name}</h3>
                  </div>
                  <p className="text-color-custom-4">{selectedFlower.meaning}</p>
                  {selectedFlower.description && <p className="mt-2 text-sm text-color-custom-4">{selectedFlower.description}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithHotspot;
