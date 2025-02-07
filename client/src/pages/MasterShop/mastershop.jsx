import React, { useEffect } from "react";
import CategoryList from "../../components/CategoryList/Categorylist";
import PLMastershop from "../../components/Listcard/PL-Mastershop";

export default function Test() {
  return (
    <div
      className="bg-center bg-cover"
      style={{ backgroundImage: "url('/Img/Background/2.jpg')" }}
    >
      <div className="container mx-auto flex">
        <div className="w-1/5 bg-color-custom-1 p-4">
          <CategoryList />
        </div>
        <div className="w-4/5 p-4">
          <PLMastershop />
        </div>
      </div>
    </div>
  );
}
