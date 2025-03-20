import React from "react";
import ReviewService from "../../components/page/home/reviewshop";
import IntroduceShop from "../../components/page/home/introduce";
import ProductList from "../../components/Listcard/ProductList";
import ProductListNew from "../../components/Listcard/ProductListNew";

export default function Home() {
  return (
    <>
      <ReviewService></ReviewService>
      <ProductListNew />
      <IntroduceShop></IntroduceShop>
      <ProductList></ProductList>
    </>
  );
}
