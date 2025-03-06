import React, { useState } from "react";
import "./header.css";

import HeaderIn4 from "./headerin4";
import Navbar from "./navbar";
import HeroSection from "./HeroSection";

export default function Header() {
  return (
    <>
      <div
        className="header w-full h-[100vh] bg-gray-100 flex flex-col"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/Img/Background/2.jpg')",
        }}
      >
        <div className="container w-full h-full sm:w-2/3 mx-auto py-10">
          <HeaderIn4 />
          <Navbar />
          <HeroSection className="h-[70%]" />
        </div>
      </div>
    </>
  );
}
