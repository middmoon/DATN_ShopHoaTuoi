import React from "react";

const CategoryCard = ({ image, name }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-lg border">
      <img
        src={image}
        alt={name}
        className="w-full h-60 object-cover rounded-xl"
      />
      <p className="mt-3 font-font2 text-center text-lg font-semibold text-color-custom-2">
        {name}
      </p>
    </div>
  );
};

export default CategoryCard;
