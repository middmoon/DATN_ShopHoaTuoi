import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const maxStars = 5;

  return (
    <div className="flex items-center space-x-2">
      <span className="font-semibold text-gray-700">{rating}</span>
      <div className="flex text-yellow-500">
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} />}
        {[...Array(maxStars - fullStars - (hasHalfStar ? 1 : 0))].map(
          (_, index) => (
            <FontAwesomeIcon
              key={index + fullStars + 1}
              icon={faStar}
              className="text-gray-300"
            />
          )
        )}
      </div>
    </div>
  );
}
