import React, { useState, useEffect } from "react";
import ProductCard from "../Card/ProductCard";
import { getProduct } from "../../APIs/productAPI";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        if (response.status === 200) {
          const shuffledProducts = response.data.sort(() => Math.random() - 0.5);
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
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000` : url;
  };

  return (
    <div className="PlSale bg-cover bg-center mx-auto">
      <div className="container mx-auto py-10 text-center relative">
        <h1 className="text-2xl font-bold font-font4">Danh Sách Sản Phẩm</h1>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-20 pb-10 relative">
        {products.slice(0, 12).map((product) => {
          const avatarImage = getDirectImageURL(product.ProductImages?.find((img) => img.is_avatar)?.img_url || product.ProductImages?.[0]?.img_url);

          return (
            <ProductCard
              key={product._id}
              image={avatarImage}
              name={product.name}
              price={product.retail_price}
              isSale={product.Events.length > 0}
              sale_price={product.Events[0]?.discount_value}
              link={`/productdetail/${product.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
