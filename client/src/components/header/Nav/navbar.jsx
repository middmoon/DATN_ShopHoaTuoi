import React, { useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(5);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      name: "Đối Tượng",
      submenu: [
        "Hoa Tặng Mẹ",
        "Hoa Tặng Ba",
        "Hoa Tặng Vợ",
        "Hoa Tặng Chồng",
        "Hoa Tặng Người Yêu",
        "Hoa Tặng Bạn Bè",
        "Hoa Tặng Đồng Nghiệp",
        "Hoa Tặng Sếp",
      ],
    },
    {
      name: "Kiểu Dáng",
      submenu: [
        "Bó Hoa Tươi",
        "Giỏ Hoa Tươi",
        "Hộp Hoa Tươi",
        "Bình Hoa Tươi",
        "Hoa Thả Bình",
        "Lãng Hoa Khai Trương",
        "Hoa Chia Buồn",
        "Hộp Mika",
      ],
    },
    {
      name: "Bộ Sưu Tập",
      submenu: [
        "Hoa Cao Cấp",
        "Hoa Sinh Viên",
        "Khuyến Mãi",
        "Ngày Phụ Nữ Việt Nam (20/10)",
        "Ngày Nhà Giáo",
        "Giáng Sinh",
        "Hoa Tết",
        "Hoa Sự Kiện",
        "Hoa Quốc Tế Phụ Nữ",
      ],
    },
    {
      name: "Xem Thêm ...",
      submenu: [
        {
          name: "Chủ Đề",
          submenu: [
            "Hoa Sinh Nhật",
            "Hoa Khai Trương",
            "Hoa Chúc Mừng",
            "Hoa Chia Buồn",
            "Hoa Chúc Sức Khỏe",
            "Hoa Tình Yêu",
            "Hoa Cảm Ơn",
            "Hoa Mừng Tốt Nghiệp",
          ],
        },
        {
          name: "Màu Sắc",
          submenu: [
            "Màu Trắng",
            "Màu Đỏ",
            "Màu Hồng",
            "Màu Cam",
            "Màu Tím",
            "Màu Vàng",
            "Màu Xanh ( Xanh Dương, Xanh Lá )",
            "Kết Hợp Màu",
          ],
        },
        {
          name: "Hoa Tươi",
          submenu: [
            "Only Rose",
            "Hoa Hồng",
            "Hoa Hướng Dương",
            "Hoa Đồng Tiền",
            "Lan Hồ Điệp",
            "Cẩm Chướng",
            "Hoa Cát Tường",
            "Hoa Ly",
            "Baby Flower",
            "Hoa Cúc",
            "Sen Đá",
          ],
        },
        {
          name: "Quà Tặng Kèm",
          submenu: [
            "Bánh Kem",
            "Chôclate",
            "Trái Cây",
            "Gấu Bông",
            "Nến Thơm",
            "Hamper",
          ],
        },
        {
          name: "Hoa Cưới",
        },
        {
          name: "Ý Nghĩa Hoa",
        },
      ],
    },
  ];

  const handleMenuClick = (name) => {
    console.log(`Clicked on menu: ${name}`);
  };

  return (
    <nav className="flex items-center justify-between text-black px-10 rounded-3xl bg-color-custom-4 z-50 border text-[10px] sm:text-xs md:text-sm lg:text-[10px] xl:text-sm">
      <div className="flex justify-between w-full">
        <ul className="flex font-font2 items-center justify-between w-1/2 mr-10 relative z-50">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative hover:text-gray-500 cursor-pointer border-r-2 pr-4 last:border-none flex-grow text-center py-6 text-[10px] sm:text-xs md:text-sm lg:text-[10px] xl:text-sm"
              onMouseEnter={() => setActiveMenu(index)} // Kích hoạt submenu
              onMouseLeave={() => {
                setActiveMenu(null); // Ẩn submenu cha khi rời chuột
                setActiveSubmenu(null); // Ẩn menu con khi rời chuột
              }}
              onClick={() => handleMenuClick(item.name)} // Thêm onClick
            >
              {item.name}
              {activeMenu === index && (
                <ul className="absolute top-full left-0 min-w-[250px] bg-color-custom-2 rounded text-left z-50">
                  {item.submenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="pl-4 py-2 bg-color-custom-2 text-color-custom-1 cursor-pointer border hover:bg-color-custom-1 hover:text-color-custom-2 relative"
                      onMouseEnter={() => {
                        if (subItem.submenu) {
                          setActiveSubmenu(subIndex); // Kích hoạt submenu con nếu có
                        }
                      }}
                      onMouseLeave={() => setActiveSubmenu(null)} // Ẩn submenu con khi rời chuột
                    >
                      {subItem.name ? (
                        // Nếu có submenu con, hiển thị thêm menu con
                        <div className="relative text-color-custom-1  hover:bg-color-custom-1 hover:text-color-custom-2">
                          <span>{subItem.name}</span>
                          {activeSubmenu === subIndex && (
                            <ul className="absolute top-0 left-full min-w-[200px] bg-color-custom-2 text-color-custom-1 rounded text-left">
                              {subItem.submenu.map(
                                (subSubItem, subSubIndex) => (
                                  <li
                                    key={subSubIndex}
                                    className="px-4 py-2 hover:bg-color-custom-1 hover:text-color-custom-2 cursor-pointer border"
                                  >
                                    {subSubItem}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      ) : (
                        subItem
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
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
              <span className="ml-2 font-font2">Giỏ Hàng</span>
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
