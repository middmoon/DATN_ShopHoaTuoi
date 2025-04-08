import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../Card/ProductCard";
import { getProduct } from "../../APIs/productAPI";
import { getCategories } from "../../APIs/categoryAPI";
import { useCategory } from "../../context/categoryContext";

const PLMastershop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const { selectedCategory } = useCategory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.status === 200) {
          const categoryMap = {};
          response.data.forEach((cat) => {
            categoryMap[cat._id] = cat.name;
          });
          setCategories(categoryMap);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const getDirectImageURL = (url) => {
    if (!url) return "https://via.placeholder.com/150?text=No+Image";
    const match = url.match(/(?:id=|\/d\/)([^/&?]+)/);
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000` : url;
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.ProductCategories?.some((cat) => cat._id === selectedCategory) : true;
    const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery) : true;
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="PlSale mx-auto relative">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">Không có sản phẩm nào</p>
      ) : (
        <>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 relative">
            {displayedProducts.map((product) => {
              const avatarImage = getDirectImageURL(
                product.ProductImages?.find((img) => img.is_avatar)?.img_url || product.ProductImages?.[0]?.img_url
              );

              return (
                <ProductCard
                  key={product._id}
                  image={avatarImage}
                  name={product.name}
                  price={product.retail_price}
                  isSale={product.Events.length > 0}
                  sale_price={product.Events[0]?.discount_value}
                  link={`/productdetail/${product.slug}`}
                />
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PLMastershop;
