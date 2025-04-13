import React, { useState, useEffect } from "react";
import ProductCard from "../Card/ProductCard";
import { getProduct } from "../../APIs/productAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Divider from "../common/Divider/Divider";

const ProductListNew = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        if (response.status === 200) {
          const shuffledProducts = response.data.sort(
            () => Math.random() - 0.5
          );
          setProducts(shuffledProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getDirectImageURL = (url) => {
    if (!url) return "/Img/Page/p3.webp";
    const match = url.match(/(?:id=|\/d\/)([^/&?]+)/);
    return match
      ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000`
      : url;
  };

  return (
    <div className="pt-20">
      <Divider />
      <div className="PlSale bg-cover bg-center mx-auto">
        <div className="container mx-auto py-10 text-center relative">
          <h1 className="text-2xl font-bold font-font4">Sản Phẩm Nổi Bật</h1>
        </div>

        <div className="container mx-auto pb-10 relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper"
          >
            {products.slice(0, 9).map((product) => {
              const avatarImage = getDirectImageURL(
                product.ProductImages?.find((img) => img.is_avatar)?.img_url ||
                  product.ProductImages?.[0]?.img_url
              );

              return (
                <SwiperSlide key={product._id}>
                  <ProductCard
                    image={avatarImage}
                    name={product.name}
                    price={
                      product.retail_price
                        ? `${product.retail_price.toLocaleString("vi-VN")} VND`
                        : "Liên hệ"
                    }
                    link={`/productdetail/${product.slug}`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductListNew;
