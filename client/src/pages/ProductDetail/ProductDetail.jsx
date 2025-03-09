import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderIn4 from "../../components/layout/header/headerin4";
import Navbar from "../../components/layout/header/navbar";
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
  const [cart, setCart] = useState([]);
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

  return (
    <>
      <div className="relative">
        <div className="container mx-auto relative pb-10">
          <HeaderIn4 />
          <Navbar />
        </div>
        <div className="bg-cover bg-center">
          <div className="container mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            <ProductImageGallery images={product.ProductImages} />
            <div className="lg:col-span-7 space-y-6 p-5 bg-color-custom-1 rounded-xl border border-gray-200">
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <div className="flex items-center space-x-2 my-3">
                <StarRating rating={product.rating || 4.5} />
                <span className="text-gray-500">
                  ({product.reviewsCount || 100} đánh giá)
                </span>
              </div>
              <p
                className={`text-md font-medium py-1 rounded-lg w-fit ${
                  product.status === "Còn hàng"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Trạng thái: {product.status}
              </p>
              <div className="text-2xl font-bold">
                <span className="text-blue-500 text-lg mr-2">
                  {product.retail_price.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <p className="text-gray-600 mt-4">{product.description}</p>
              <Divider />
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Danh mục:
                </h2>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {product.ProductCategories?.map((category) => (
                    <li
                      key={category._id}
                      className="hover:text-purple-600 hover:font-semibold"
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
              <Divider />
              <div className="mt-4">
                <label className="block text-lg font-semibold">Số lượng:</label>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 p-2 border rounded-lg text-center"
                />
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 mt-4"
                >
                  Thêm {quantity} sản phẩm vào giỏ hàng
                </button>
                {message && (
                  <p className="mt-4 text-green-600 font-semibold">{message}</p>
                )}
              </div>
            </div>
          </div>
          <Divider />
          <div className="bg-white container mx-auto pb-10">
            <WhyChoiceMe />
          </div>
          <Divider />
          <div>
            <PLProductDetail />
          </div>
        </div>
        <Divider />
        <Footer />
      </div>
    </>
  );
}
