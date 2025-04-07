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
import EventPopup from "../../components/Event/EventPopup";
import apiv1 from "../../utils/axiosClient";

export default function Home() {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const fetchCurrentEvent = async () => {
      try {
        const response = await apiv1.get("/event/current");
        if (response.status === 200 && response.data.data) {
          setCurrentEvent(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchCurrentEvent();
  }, []);
  return (
    <>
      <div>
        {currentEvent && showPopup && <EventPopup thumbnail={currentEvent.thumbnail} slug={currentEvent.slug} onClose={() => setShowPopup(false)} />}
      </div>
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
