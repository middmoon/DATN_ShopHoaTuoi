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

export default function Home() {
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
      <GoogleMapEmbed />
    </>
  );
}
