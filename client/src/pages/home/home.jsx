import React, { useEffect, useState } from "react";
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
import EventPopup from "../../components/Event/eventPopup";
import { useEvent } from "../../context/eventContext";

export default function Home() {
  const { currentEvent } = useEvent();
  const [showPopup, setShowPopup] = useState(true);
  const imageSrc = "/Img/Flower/p3.webp";

  return (
    <>
      <div>
        {currentEvent && showPopup && <EventPopup thumbnail={currentEvent.thumbnail} slug={currentEvent.slug} onClose={() => setShowPopup(false)} />}
      </div>
      <MainBanner />
      <Divider />
      <ReviewService></ReviewService>
      <IntroduceShop></IntroduceShop>
      {/* <ProductListNew /> */}
      <ProductListNew />
      <WhyChoiceMe />
      <Divider />
      <ProductList></ProductList>
      <ImageHotspot imageSrc={imageSrc} hotspots={hotspots} />
      <GoogleMapEmbed />
    </>
  );
}
