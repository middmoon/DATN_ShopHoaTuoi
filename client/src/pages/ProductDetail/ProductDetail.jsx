import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import WhyChoiceMe from "../../components/WCM/whychoiceme";
import PLProductDetail from "../../components/Listcard/PL-ProductDetail";
import Footer from "../../components/layout/Footer/Footer";
import Divider from "../../components/common/Divider/Divider";
import { getProductBySlug } from "../../APIs/productAPI";
import StarRating from "../../components/StarRating/StarRating";
import { useCart } from "../../context/cartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  if (!product) return <p>Loading...</p>;

  const hasDiscount = product.Events && product.Events.length > 0;
  let discountedPrice = product.retail_price;

  if (hasDiscount) {
    const event = product.Events[0];
    if (event.discount_type === "fixed") {
      discountedPrice = product.retail_price - event.discount_value;
    } else if (event.discount_type === "percentage") {
      discountedPrice = product.retail_price - (product.retail_price * event.discount_value) / 100;
    }
    discountedPrice = Math.max(discountedPrice, 0);
  }

  return (
    <>
      <div className="relative">
        <div className="pt-10">
          <div className="container mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            <ProductImageGallery images={product.ProductImages} />
            <div className="lg:col-span-7 space-y-6 p-5 bg-color-custom-4 rounded-xl border border-gray-200">
              <h2 className="text-3xl font-bold text-color-custom-1">{product.name}</h2>
              <div className="flex items-center space-x-2 my-3">
                <StarRating rating={product.rating || 4.5} />
                <span className="text-gray-500">({product.reviewsCount || 100} đánh giá)</span>
              </div>
              <p className={`text-md font-medium py-1 rounded-lg w-fit ${product.status === "Còn hàng" ? "text-color-custom-1" : "text-red-500"}`}>
                Trạng thái: {product.status}
              </p>
              <div className="text-2xl font-bold">
                {hasDiscount ? (
                  <>
                    <span className="text-gray-500 line-through mr-2">{product.retail_price.toLocaleString("vi-VN")}đ</span>
                    <span className="text-red-500">{discountedPrice.toLocaleString("vi-VN")}đ</span>
                  </>
                ) : (
                  <span className="text-blue-500">{product.retail_price.toLocaleString("vi-VN")}đ</span>
                )}
              </div>
              <p className="text-gray-600 mt-4">{product.description}</p>
              <Divider />
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-color-custom-1 mb-2">Danh mục:</h2>
                <ul className="list-disc list-inside space-y-1 text-color-custom-3">
                  {product.ProductCategories?.map((category) => (
                    <li key={category._id} className="hover:text-color-custom-1">
                      <a href="">{category.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <Divider />
              <div className="mt-4 space-y-4">
                <label className="block text-lg font-semibold">Số lượng:</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 p-2 border rounded-lg text-center"
                  />
                  <button
                    onClick={handleAddToCart}
                    className="px-6 py-1.5 bg-color-custom-1 text-color-custom-4 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
                  >
                    Thêm {quantity} sản phẩm
                  </button>
                </div>
                {message && <p className="text-green-600 font-semibold">{message}</p>}
              </div>
            </div>
          </div>
          <Divider />
          <div className="bg-white ">
            <WhyChoiceMe />
          </div>
          <Divider />
          <div>
            <PLProductDetail />
          </div>
        </div>
        <Divider />
      </div>
    </>
  );
}
