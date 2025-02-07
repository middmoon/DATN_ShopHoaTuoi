import React, { useState } from "react";

const categories = [
  {
    parent: "Dịp - Occasion",
    children: [
      "Hoa sinh nhật",
      "Hoa khai trương",
      "Hoa chúc mừng",
      "Chia sẻ hoa chia buồn",
      "Chủ đề hoa tình yêu",
      "Chủ đề hoa cảm ơn",
      "Chủ đề hoa tốt nghiệp",
    ],
  },
  {
    parent: "Đối tượng",
    children: [
      "Hoa tặng sếp",
      "Hoa tặng bạn bè",
      "Hoa tặng vợ",
      "Hoa tặng chồng",
      "Hoa tặng người yêu",
      "Hoa tặng mẹ",
      "Hoa tặng bố",
      "Hoa tặng con",
      "Hoa tặng ông bà",
      "Hoa tặng thầy cô",
      "Hoa tặng đồng nghiệp",
    ],
  },
  {
    parent: "Mức Giá",
    children: [
      "Tất cả",
      "Dưới 500.000",
      "500.000 - 1.000.000",
      "1.000.000 - 2.000.000",
      "2.000.000 - 3.000.000",
      "3.000.000 - 5.000.000",
      "5.000.000 - 10.000.000",
      "Trên 10.000.000",
    ],
  },
  {
    parent: "Màu sắc",
    children: [
      "Màu đỏ",
      "Màu hồng",
      "Màu vàng",
      "Màu cam",
      "Màu trắng",
      "Màu trà sữa",
      "Màu xanh dương",
      "Màu xanh lá",
      "Màu tím",
    ],
  },
  // New Categories Added
  {
    parent: "Loại hoa",
    children: [
      "Hoa hồng",
      "Hoa cúc",
      "Hoa lan",
      "Hoa hướng dương",
      "Hoa ly",
      "Hoa sen",
      "Hoa cẩm chướng",
      "Hoa cẩm tú cầu",
      "Hoa cẩm chướng",
    ],
  },
];

export default function CategoryList() {
  const [price, setPrice] = useState(500000);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <div className="category-list p-4 border rounded-xl">
      <h2 className="text-xl font-bold mb-4">Danh mục</h2>

      {categories.slice(0, 2).map((category, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold">{category.parent}</h3>
          <ul>
            {category.children.map((child, childIndex) => (
              <li key={childIndex}>
                <input
                  type="checkbox"
                  id={`category-${index}-${childIndex}`}
                  className="round-checkbox"
                />
                <label
                  htmlFor={`category-${index}-${childIndex}`}
                  className="ml-2"
                >
                  {child}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mb-4">
        <h3 className="font-semibold">Mức giá</h3>
        <div className="flex items-center">
          <span className="mr-2">0</span>
          <input
            type="range"
            min="0"
            max="10000000"
            step="50000"
            value={price}
            onChange={handlePriceChange}
            className="flex-grow"
          />
          <span className="ml-2">10.000.000</span>
        </div>
        <div className="mt-2 text-sm">
          Giá hiện tại:{" "}
          <span className="font-bold">{formatCurrency(price)} VND</span>
        </div>
      </div>

      {categories.slice(2).map((category, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold">{category.parent}</h3>
          <ul>
            {category.children.map((child, childIndex) => (
              <li key={childIndex}>
                <input
                  type="checkbox"
                  id={`new-category-${index}-${childIndex}`}
                />
                <label
                  htmlFor={`new-category-${index}-${childIndex}`}
                  className="ml-2"
                >
                  {child}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
