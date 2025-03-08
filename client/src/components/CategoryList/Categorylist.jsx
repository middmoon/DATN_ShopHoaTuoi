import React, { useState, useEffect } from "react";
import { getCategories } from "../../APIs/categoryAPI";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(500000);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.status === 200) {
          console.log("Dữ liệu sản phẩm:", response.data);
          const categoryData = response.data;

          const categoryMap = {};
          categoryData.forEach((cat) => {
            if (!cat.parent_id) {
              categoryMap[cat._id] = { parent: cat.name, children: [] };
            }
          });

          categoryData.forEach((cat) => {
            if (cat.parent_id && categoryMap[cat.parent_id]) {
              categoryMap[cat.parent_id].children.push(cat.name);
            }
          });

          setCategories(Object.values(categoryMap));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <div className="category-list p-4 border rounded-xl">
      <h2 className="text-xl font-bold mb-4">Danh mục</h2>

      {categories.map((category, index) => (
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
    </div>
  );
}
