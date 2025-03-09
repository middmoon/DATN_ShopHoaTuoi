import userBaseRestRequest from "../APIs/base/rest";

const { get } = userBaseRestRequest();

// Lấy danh sách tất cả sản phẩm
export const getProduct = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await get(`/product?${query}`);
    
    
    if (response.status === 200) {
      console.log("Dữ liệu sản phẩm từ API:", response.data); 
      return {
        status: 200,
        data: response.data.map((product) => ({
          ...product,
          images: product.ProductImages?.map((img) => img.img_url) || [],
        })),
      };
    }
    return { status: response.status, data: [] };
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
    return { status: 500, data: [] };
  }
};




export const getProductBySlug = async (slug) => {
    return await get(`/product/${slug}`);
  };
  
