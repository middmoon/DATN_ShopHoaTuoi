import React, { useEffect } from "react";
import CategoryList from "../../components/CategoryList/Categorylist";
import PLMastershop from "../../components/Listcard/PL-Mastershop";

import HeaderIn4 from "../../components/layout/header/headerin4";
import Navbar from "../../components/layout/header/navbar";

export default function Mastershop() {
  return (
    <div
      className="bg-center bg-cover"
      style={{ backgroundImage: "url('/Img/Background/2.jpg')" }}
    >
      <div className="container mx-auto">
        <HeaderIn4 />
        <Navbar />
      </div>
      <div className="container mx-auto flex p-10">
        <div className="w-1/5 rounded-xl">
          <CategoryList />
        </div>
        <div className="w-4/5 px-4">
          <PLMastershop />
        </div>
      </div>
    </div>
  );
}
