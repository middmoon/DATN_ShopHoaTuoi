import React, { useEffect, useState } from "react";
import { getCategories } from "../../APIs/categoryAPI";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setError("Invalid API response format");
        }
      } catch (err) {
        setError("Failed to fetch categories");
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const groupedCategories =
    categories?.reduce((acc, category) => {
      const { parent_id } = category;
      if (!acc[parent_id]) acc[parent_id] = [];
      acc[parent_id].push(category);
      return acc;
    }, {}) || {};

  const mainCategories = ["Đối Tượng", "Kiểu Dáng", "Chủ Đề"];
  const filteredCategories =
    groupedCategories[null]?.filter((category) =>
      mainCategories.includes(category.name)
    ) || [];
  const otherCategories =
    groupedCategories[null]?.filter(
      (category) => !mainCategories.includes(category.name)
    ) || [];

  return (
    <nav className="text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-6">
          {filteredCategories.map((parent) => (
            <li key={parent._id} className="relative">
              <button
                className="hover:underline cursor-pointer flex items-center"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === parent._id ? null : parent._id
                  )
                }
              >
                {parent.name}
              </button>
              {openDropdown === parent._id && (
                <ul className="absolute left-0 mt-2 w-52 bg-white text-black border border-gray-300 shadow-lg rounded-lg">
                  {groupedCategories[parent._id]?.map((child) => (
                    <li
                      key={child._id}
                      className="px-4 py-2 hover:bg-gray-100"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          {otherCategories.length > 0 && (
            <li className="relative">
              <button
                className="hover:underline cursor-pointer flex items-center"
                onClick={() =>
                  setOpenDropdown(openDropdown === "more" ? null : "more")
                }
              >
                Xem Thêm
              </button>
              {openDropdown === "more" && (
                <ul className="absolute left-0 mt-2 w-52 bg-white text-black border border-gray-300 shadow-lg rounded-lg">
                  {otherCategories.map((parent) => (
                    <li key={parent._id} className="relative">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === parent._id ? null : parent._id
                          )
                        }
                      >
                        {parent.name} {groupedCategories[parent._id] ? "" : ""}
                      </button>
                      {openSubmenu === parent._id &&
                        groupedCategories[parent._id] && (
                          <ul className="absolute left-full top-0 mt-0 w-48 bg-white text-black border border-gray-300 shadow-lg rounded-lg">
                            {groupedCategories[parent._id].map((child) => (
                              <li
                                key={child._id}
                                className="px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setOpenSubmenu(null);
                                }}
                              >
                                {child.name}
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
