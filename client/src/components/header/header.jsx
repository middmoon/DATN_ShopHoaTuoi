import React, { useState } from "react";
import "../header/header.css";

import Navbar from "./Nav/navbar";
import HeaderIn4 from "./Nav/headerin4";
import HeroSection from "../header/HeroSection/HeroSection";

export default function Header() {
  return (
    <>
      <div className="header w-full h-[100vh] bg-gray-100 flex flex-col">
        <div className="container w-full h-full sm:w-2/3 mx-auto py-10">
          <HeaderIn4 />
          <Navbar />
          <HeroSection className="h-[70%]" />
        </div>
      </div>
    </>
  );
}
