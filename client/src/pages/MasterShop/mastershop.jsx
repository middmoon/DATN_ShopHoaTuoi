import React from "react";
import CategoryList from "../../components/CategoryList/Categorylist";
import PLMastershop from "../../components/Listcard/PL-Mastershop";

export default function Mastershop() {
  return (
    <div className="bg-center bg-cover">
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
