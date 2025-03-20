import React, { useState } from "react";
import "./header.css";

import HeaderIn4 from "./headerin4";
import Navbar from "./navbar";
import HeroSection from "./HeroSection";

export default function Header() {
  return (
    <>
      <div className="header w-full h-[100vh] flex flex-col bg-color-custom-4">
        <div className="container w-full h-full sm:w-2/3 mx-auto py-10">
          <HeaderIn4 />
          <Navbar />
          <HeroSection className="h-[70%]" />
        </div>
      </div>
    </>
  );
}
