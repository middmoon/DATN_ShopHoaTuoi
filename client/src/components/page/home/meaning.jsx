import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  {
    src: "/Img/Page/p7.webp",
    title: "Nature is beautiful",
    author: "John Doe",
  },
  {
    src: "/Img/Page/p7.webp",
    title: "The city never sleeps",
    author: "Jane Smith",
  },
  { src: "/Img/Page/p7.webp", title: "Future is now", author: "Josh Gray" },
  { src: "/Img/Page/p7.webp", title: "The Art of Life", author: "Sarah Doe" },
  { src: "/Img/Page/p7.webp", title: "Technology & You", author: "Tom Brix" },
  {
    src: "/Img/Page/p7.webp",
    title: "Innovation at Heart",
    author: "Emily Clark",
  },
  {
    src: "/Img/Page/p7.webp",
    title: "Beyond Imagination",
    author: "Lucas Reed",
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white flex flex-col gap-2 mt-[100px] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-[100px] flex flex-col items-center justify-center gap-2"
      >
        <p className="!mb-0 text-[15px] font-[300] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
          CEO và người có ảnh hưởng
        </p>
        <h1 className="!mb-0 text-[45px] font-[500] max-w-[900px] text-center">
          Top những CEO và người có ảnh hưởng đã có mặt trên nền tảng của chúng
          tôi
        </h1>
      </motion.div>

      <div className="flex justify-center items-center overflow-hidden w-full h-[700px] relative">
        {images.map((image, index) => {
          const position =
            (index - currentIndex + images.length) % images.length; // Đảm bảo vị trí lặp

          if (position >= 5) return null; // Chỉ hiển thị tối đa 5 ảnh

          return (
            <motion.div
              key={index}
              className="absolute w-[350px] h-[550px] rounded-xl overflow-hidden"
              animate={{
                x: (position - 2) * 250, // Giữ khoảng cách giữa các ảnh
                scale: position === 2 ? 1 : 0.8, // Ảnh trung tâm lớn hơn
                opacity: position > 4 ? 0 : 1, // Giảm opacity nếu ngoài phạm vi
                rotateY: position === 2 ? 0 : (position - 2) * -20, // Quay nhẹ ảnh hai bên
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={image.src}
                className="w-full h-full object-cover"
                alt={image.title}
              />
              <div className="absolute bottom-0 bg-black/50 text-white w-full text-center p-2">
                <p className="text-lg">{image.title}</p>
                <p className="text-sm">{image.author}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
