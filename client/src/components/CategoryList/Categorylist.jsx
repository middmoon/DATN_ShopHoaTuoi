import React, { useState, useEffect } from "react";
import { getCategories } from "../../APIs/categoryAPI";
import { useCategory } from "../../context/categoryContext";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = useCategory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.status === 200) {
          const categoryData = response.data;

          const categoryMap = {};
          categoryData.forEach((cat) => {
            if (!cat.parent_id) {
              categoryMap[cat._id] = { parent: cat, children: [] };
            }
          });

          categoryData.forEach((cat) => {
            if (cat.parent_id && categoryMap[cat.parent_id]) {
              categoryMap[cat.parent_id].children.push(cat);
            }
          });

          setCategories(Object.values(categoryMap));
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-list p-4 border rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4">Danh mục</h2>

      {/* Nút chọn tất cả sản phẩm */}
      <button
        className={`px-4 py-2 mb-3 rounded w-full ${
          !selectedCategory ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        Tất cả sản phẩm
      </button>

      {categories.map((category) => (
        <div key={category.parent._id} className="mb-4">
          <h3 className="font-semibold">{category.parent.name}</h3>
          <ul className="ml-2">
            {category.children.map((child) => (
              <li key={child._id} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === child._id}
                  onChange={() => {
                    setSelectedCategory(child._id);
                    console.log("Danh mục đã chọn:", child._id);
                  }}
                  className="mr-2"
                />
                <label>{child.name}</label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
