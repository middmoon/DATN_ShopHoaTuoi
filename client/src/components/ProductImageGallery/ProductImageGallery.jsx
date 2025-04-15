import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const getDirectImageURL = (url) => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000` : url;
};

export default function ProductImageGallery({ images = [] }) {
  const [mainImage, setMainImage] = useState(
    images.length > 0 ? getDirectImageURL(images[0].img_url) : "https://via.placeholder.com/150?text=No+Image"
  );

  return (
    <div className="lg:col-span-5 flex flex-col items-center">
      <div className="flex w-full bg-color-custom-4 justify-center items-center">
        <img src={mainImage} alt="Main product" className="w-[90%] h-[500px] bg-color-custom-4 object-contain rounded-lg border" />
      </div>

      <div className="w-full py-10 px-4 bg-color-custom-4">
        <Swiper spaceBetween={10} slidesPerView={3} className="h-[100px]">
          {images.map((img, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center h-full">
              <img
                src={getDirectImageURL(img.img_url)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full max-h-[100px] rounded-lg border cursor-pointer object-cover"
                onClick={() => setMainImage(getDirectImageURL(img.img_url))}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150?text=No+Image";
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
