import HeaderIn4 from "../../components/header/Nav/headerin4";
import Navbar from "../../components/header/Nav/navbar";
import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import ProductInfo from "../../components/ProductInfo/ProductInfo";

export default function ProductDetail() {
  return (
    <>
      <div
        className="relative bg-gray-100 bg-cover bg-center"
        style={{ backgroundImage: "url('/Img/Background/4.jpg')" }}
      >
        {/* Lớp phủ màu trắng */}
        <div className="absolute inset-0 bg-white opacity-50"></div>

        <div className="container mx-auto relative">
          <HeaderIn4 />
          <Navbar />
        </div>
        <div className="container mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          <ProductImageGallery />
          <ProductInfo />
        </div>
      </div>
    </>
  );
}
