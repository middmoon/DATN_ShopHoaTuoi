import React from "react";
import ReviewService from "../../components/page/home/reviewshop";
import IntroduceShop from "../../components/page/home/introduce";
import ProductList from "../../components/Listcard/ProductList";
import ProductListNew from "../../components/Listcard/ProductListNew";
import MainBanner from "../../components/page/home/banner";
import GoogleMapEmbed from "../../components/page/home/ggMap";
import Meaning from "../../components/page/home/meaning";
import WhyChoiceMe from "../../components/WCM/whychoiceme";
import Divider from "../../components/common/Divider/Divider";
import hotspots from "../../constant/common/hotspots.json";
import ImageHotspot from "../../components/ImageWithHotspot/ImageWithHotspot";

export default function Home() {
  const imageSrc = "/Img/Flower/p3.webp";

  return (
    <>
      <MainBanner />
      <Divider />
      <ReviewService></ReviewService>
      <IntroduceShop></IntroduceShop>
      <ProductListNew />
      <WhyChoiceMe />
      <Divider />
      <ProductList></ProductList>
      <ImageHotspot imageSrc={imageSrc} hotspots={hotspots} />
      <GoogleMapEmbed />
    </>
  );
}
