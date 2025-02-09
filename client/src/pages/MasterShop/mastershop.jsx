import React, { useEffect } from "react";
import CategoryList from "../../components/CategoryList/Categorylist";
import PLMastershop from "../../components/Listcard/PL-Mastershop";

import HeaderIn4 from "../../components/header/Nav/headerin4";
import Navbar from "../../components/header/Nav/navbar";

export default function Mastershop() {
  return (
    <>
      <div
        className="bg-center bg-cover"
        style={{ backgroundImage: "url('/Img/Background/2.jpg')" }}
      >
        <div className="container mx-auto">
          <HeaderIn4 />
          <Navbar />
        </div>
        <div className="container mx-auto flex  p-10">
          <div className="w-1/5 bg-color-custom-1">
            <CategoryList />
          </div>
          <div className="w-4/5 px-4">
            <PLMastershop />
          </div>
        </div>
      </div>
    </>
  );
}
