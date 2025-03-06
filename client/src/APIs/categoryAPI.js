import userBaseRestRequest from "../APIs/base/rest";

const { get } = userBaseRestRequest();

export const getCategories = async () => {
  return await get("/product-categories");
};
