import userBaseRestRequest from "../APIs/base/rest";

const { get } = userBaseRestRequest();

// Lấy danh sách tất cả sản phẩm
export const getProduct = async () => {
  return await get("/product");
};

// Lấy thông tin sản phẩm theo slug
export const getProductBySlug = async (slug) => {
    return await get(`/product/${slug}`);
  };
  
