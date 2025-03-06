import {
  GET_METHOD,
  POST_METHOD,
  PUT_METHOD,
  DELETE_METHOD,
  ServiceURL,
  HeaderConfig,
} from "./config";

const userBaseRestRequest = () => {
  const baseURL = ServiceURL;

  const fetchBase = async (method, endpoint, data = null) => {
    const config = {
      method,
      headers: HeaderConfig,
    };

    if (method !== GET_METHOD && data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${baseURL}${endpoint}`, config);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return {
    get: (endpoint) => fetchBase(GET_METHOD, endpoint),
    post: (endpoint, data) => fetchBase(POST_METHOD, endpoint, data),
    put: (endpoint, data) => fetchBase(PUT_METHOD, endpoint, data),
    delete: (endpoint, data) => fetchBase(DELETE_METHOD, endpoint, data),
  };
};

export default userBaseRestRequest;
