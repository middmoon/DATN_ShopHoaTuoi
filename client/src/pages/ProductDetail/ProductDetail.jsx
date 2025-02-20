import HeaderIn4 from "../../components/header/Nav/headerin4";
import Navbar from "../../components/header/Nav/navbar";
import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import WhyChoiceMe from "../../components/WCM/whychoiceme";
import PLProductDetail from "../../components/Listcard/PL-ProductDetail";
import Footer from "../../components/Footer/Footer";
import Divider from "../../components/Divider/Divider";

export default function ProductDetail() {
  return (
    <>
      <div className="relative">
        <div className="container mx-auto relative pb-10 ">
          <HeaderIn4 />
          <Navbar />
        </div>
        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/Img/Background/7.jpg')",
          }}
        >
          <div className="container mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            <ProductImageGallery />
            <ProductInfo />
          </div>
          <Divider />
          <div className="bg-white">
            <div className="container mx-auto pb-10">
              <WhyChoiceMe />
            </div>
          </div>
          <Divider />
          <div className="">
            <PLProductDetail />
          </div>
        </div>
        <Divider />
        <Footer />
      </div>
    </>
  );
}
