import React from "react";
import "../home/home.css";
import Header from "../../components/header/header";
import ReviewService from "../../components/introduceshop/reviewshop";
import PLSale from "../../components/Listcard/PLSale";
import IntroduceShop from "../../components/introduceshop/introduce";
import ProductList from "../../components/Listcard/ProductList";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header></Header>
      <ReviewService></ReviewService>
      <PLSale></PLSale>
      <IntroduceShop></IntroduceShop>
      <ProductList></ProductList>
      <Footer></Footer>
    </>
  );
}
