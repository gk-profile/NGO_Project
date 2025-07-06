import axios from "axios";

// ngo api axios Instance
export const ngoApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ngo interceptor
ngoApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ngoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const commonGET = async (url: string, params?: Record<string, any>) => {
  try {
    const response = await ngoApi.get(url, { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const commonPOST = async (url: string, payload: Record<string, any>) => {
  try {
    const response = await ngoApi.post(url, payload);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message ||
      "Something went wrong";
    throw new Error(message);
  }
};

export const commonPUT = async (url: string, payload: Record<string, any>) => {
  try {
    const response = await ngoApi.put(url, payload);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message ||
      "Something went wrong";
    throw new Error(message);
  }
};

export const commonDelete = async (
  url: string,
  payload: Record<string, any>
) => {
  try {
    const response = await ngoApi.delete(url, { data: payload });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message ||
      "Something went wrong";
    throw new Error(message);
  }
};
