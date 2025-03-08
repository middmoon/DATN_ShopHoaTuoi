import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderIn4 from "../../components/layout/header/headerin4";
import Navbar from "../../components/layout/header/navbar";
import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import WhyChoiceMe from "../../components/WCM/whychoiceme";
import PLProductDetail from "../../components/Listcard/PL-ProductDetail";
import Footer from "../../components/layout/Footer/Footer";
import Divider from "../../components/common/Divider/Divider";
import { getProductBySlug } from "../../APIs/productAPI";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);

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

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    console.log("Giỏ hàng hiện tại:", cart);
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
            <ProductInfo product={product} onAddToCart={handleAddToCart} />
          </div>
          <Divider />
          <div className="bg-white">
            <div className="container mx-auto pb-10">
              <WhyChoiceMe />
            </div>
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
