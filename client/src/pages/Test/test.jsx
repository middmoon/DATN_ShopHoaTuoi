import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../APIs/productAPI";
import ButtonAddToCard from "../../components/common/Button/buttonAddToCard";

export default function Test() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        if (response.status === 200) {
          console.log("Product data:", response.data);
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  const getDirectImageURL = (url) => {
    const match = url.match(/id=([^&]+)/);
    return match
      ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000`
      : url;
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-10 px-5">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {/* Ảnh sản phẩm */}
      <div className="flex gap-4 mt-4">
        {product.ProductImages?.length > 0 ? (
          product.ProductImages.map((img, index) => (
            <img
              key={index}
              src={getDirectImageURL(img.img_url)}
              alt={`Hình ảnh ${index + 1}`}
              className="w-40 h-40 object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
          ))
        ) : (
          <img
            src="https://via.placeholder.com/150?text=No+Image"
            alt="Ảnh mặc định"
            className="w-40 h-40 object-cover rounded-lg shadow-md"
          />
        )}
      </div>

      <p className="text-lg font-semibold mt-4">
        Giá:{" "}
        {product.retail_price
          ? `${product.retail_price.toLocaleString("vi-VN")} VND`
          : "Liên hệ"}
      </p>
      <p className="text-md mt-2">Trạng thái: {product.status}</p>
      <p className="mt-2">{product.description}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Danh mục:</h2>
        <ul className="list-disc list-inside">
          {product.ProductCategories?.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <ButtonAddToCard
          product={product}
          text={"Thêm vào giỏ hàng"}
          type="text"
          className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        />
      </div>
    </div>
  );
}
