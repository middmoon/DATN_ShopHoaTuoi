import React, { useEffect, useState } from "react";
import { getCategories } from "../../../APIs/categoryAPI";
import { useCart } from "../../../context/cartContext";

export default function Navbar() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

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
    <nav className="flex items-center justify-between text-black px-10 rounded-3xl bg-color-custom-4 z-50 border text-[10px] sm:text-xs md:text-sm lg:text-[10px] xl:text-sm">
      <div className="flex justify-between w-full">
        <ul className="flex font-font2 items-center justify-between w-1/2 mr-10 relative z-50">
          {filteredCategories.map((parent) => (
            <li key={parent._id} className="relative py-6">
              <button
                className="cursor-pointer flex items-center"
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

        <div className="flex items-center justify-center w-1/2">
          <input
            type="text"
            placeholder="Tìm Kiếm..."
            className="bg-color-custom-4 px-4 font-font2 py-2 rounded-lg text-black border outline-none w-20 sm:w-32 md:w-48 lg:w-64 xl:w-80 2xl:w-96"
          />

          <div className="flex items-center justify-center space-x-4 sm:space-x-6">
            {/* Giỏ Hàng */}
            <div
              className="flex items-center cursor-pointer hover:text-gray-500 justify-center relative 
                  w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="ml-2 font-font2">
                <a href="/cart">Giỏ Hàng</a>
              </span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Tài Khoản */}
            <div
              className="flex items-center cursor-pointer hover:text-gray-500 justify-center 
                  w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              <span className="ml-2 font-font2">Tài Khoản</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
