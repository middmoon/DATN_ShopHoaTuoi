const BASE_URL = "http://localhost:3000/api/v1/address";

export const fetchProvinces = async () => {
  try {
    const response = await fetch(`${BASE_URL}/procince`);
    if (!response.ok) {
      throw new Error(`Lỗi API: ${response.status}`);
    }
    const result = await response.json();
    return result.data?.province || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tỉnh:", error);
    return [];
  }
};

export const fetchDistricts = async (provinceCode) => {
  if (!provinceCode) return [];
  try {
    const response = await fetch(`${BASE_URL}/district/${provinceCode}`);
    if (!response.ok) {
      throw new Error(`Lỗi API: ${response.status}`);
    }
    const result = await response.json();
    return result.data?.district || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quận/huyện:", error);
    return [];
  }
};

export const fetchWards = async (districtCode) => {
  if (!districtCode) return [];
  try {
    const response = await fetch(`${BASE_URL}/ward/${districtCode}`);
    if (!response.ok) {
      throw new Error(`Lỗi API: ${response.status}`);
    }
    const result = await response.json();
    return result.data?.ward || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phường/xã:", error);
    return [];
  }
};
