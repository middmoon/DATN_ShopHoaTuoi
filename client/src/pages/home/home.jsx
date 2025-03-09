import React from "react";
import ReviewService from "../../components/page/home/reviewshop";
import PLSale from "../../components/Listcard/PLSale";
import IntroduceShop from "../../components/page/home/introduce";
import ProductList from "../../components/Listcard/ProductList";

export default function Home() {
  return (
    <>
      <ReviewService></ReviewService>
      {/* <PLSale></PLSale> */}
      <IntroduceShop></IntroduceShop>
      <ProductList></ProductList>
    </>
  );
}
