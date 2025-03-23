import React, { useEffect, useState } from "react";
import { getCategories } from "../../../APIs/categoryAPI";
import { useCart } from "../../../context/cartContext";
import { useCategory } from "../../../context/categoryContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { getTotalItems } = useCart();
  const { setSelectedCategory } = useCategory();
  const cartCount = getTotalItems();

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTop, setIsTop] = useState(true); // Theo dõi vị trí cuộn

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    setUserEmail(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

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
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const groupedCategories = categories.reduce((acc, category) => {
    const { parent_id } = category;
    if (!acc[parent_id]) acc[parent_id] = [];
    acc[parent_id].push(category);
    return acc;
  }, {});

  const mainCategories = ["Đối Tượng", "Kiểu Dáng", "Hoa Tươi"];
  const filteredCategories =
    groupedCategories[null]?.filter((category) =>
      mainCategories.includes(category.name)
    ) || [];

  const otherCategories =
    groupedCategories[null]?.filter(
      (category) => !mainCategories.includes(category.name)
    ) || [];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/mastershop`);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/mastershop?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div
      className={`header w-full h-[10vh] fixed top-0 flex flex-col transition-all duration-300 z-50 ${
        isTop
          ? "bg-transparent text-black"
          : "bg-color-custom-4 text-white shadow-lg"
      }`}
    >
      <div className="w-full h-full mx-auto">
        <div className="flex items-center w-full h-full px-10">
          <div className="flex-[1]">
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-4">
              <div className="flex-1 font-font1 text-center font-bold whitespace-nowrap">
                <a
                  href="/"
                  className={`text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${
                    isTop ? "text-color-custom-1" : "text-color-custom-4"
                  }`}
                >
                  PETACILIOUS
                </a>
              </div>
            </div>
          </div>
          <div className="flex-[4]">
            <nav className="flex items-center justify-between px-10 rounded-3xl z-50 text-[10px] sm:text-xs md:text-sm lg:text-[10px] xl:text-sm">
              <div className="flex justify-between w-full">
                <ul className="flex font-font2 items-center justify-between w-1/2 mr-10 relative z-50 ">
                  {filteredCategories.map((parent) => (
                    <li
                      key={parent._id}
                      className="relative group py-6 text-color-custom-4"
                    >
                      <button
                        className={`cursor-pointer flex items-center ${
                          isTop ? "text-color-custom-1" : "text-color-custom-4"
                        }`}
                        onClick={() => handleCategoryClick(parent._id)}
                      >
                        {parent.name}
                      </button>
                      {groupedCategories[parent._id] && (
                        <ul className="absolute text-color-custom-3 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 transform translate-y-2 grid">
                          {groupedCategories[parent._id].map((child) => (
                            <li
                              key={child._id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition rounded-lg"
                            >
                              <button
                                onClick={() => handleCategoryClick(child._id)}
                              >
                                {child.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}

                  {otherCategories.length > 0 && (
                    <li className="relative group">
                      <button
                        className={`px-4 py-2  font-medium transition-colors ${
                          isTop ? "text-color-custom-1" : "text-color-custom-4"
                        }`}
                      >
                        Xem Thêm
                      </button>
                      <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 transform translate-y-2 grid">
                        {otherCategories.map((category) => (
                          <li
                            key={category._id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition rounded-lg"
                          >
                            <button
                              onClick={() => handleCategoryClick(category._id)}
                            >
                              {category.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>

                <div className="flex items-center justify-center w-1/2">
                  <input
                    type="text"
                    placeholder="Tìm Kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                    className="bg-color-custom-4 px-4 py-2 rounded-lg text-black border outline-none w-64"
                  />

                  <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                    <div
                      className="flex items-center cursor-pointer text-color-custom-4 justify-center relative 
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
                      <span className="ml-2 font-font2 text-color-custom-4">
                        <a href="/cart">Giỏ Hàng</a>
                      </span>
                      {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <div
                        className="flex items-center cursor-pointer text-color-custom-4"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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

                        <span
                          className="ml-2 font-font2 text-color-custom-4 cursor-pointer"
                          onClick={() => {
                            if (!userEmail) navigate("/login");
                          }}
                        >
                          {userEmail ? userEmail : "Đăng Nhập"}
                        </span>
                      </div>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && userEmail && (
                        <div className="absolute right-0 mt-5 w-48 bg-white shadow-md rounded-lg py-2">
                          <a
                            href="/profile"
                            className="px-4 py-2 text-gray-700"
                          >
                            Tra Cứu Đơn Hàng
                          </a>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Đăng Xuất
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
