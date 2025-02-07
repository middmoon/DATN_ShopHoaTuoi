import React, { useEffect } from "react";
import CategoryList from "../../components/CategoryList/Categorylist";
import PLMastershop from "../../components/Listcard/PL-Mastershop";

export default function Test() {
  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/677bbcafaf5bfec1dbe74910/1ijfjlehq";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

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
