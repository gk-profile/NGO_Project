import { type LoginFormType, type RegisterFormType } from "@/form/loginForm";
import axios from "axios";

export const ldap = axios.create({
  baseURL: "http://127.0.0.1:8000/auth/",
  headers: {
    "Content-Type": "application/json",
  },
});

ldap.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ldap.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const userRegister = async (data: RegisterFormType) => {
  try {
    const response = await ldap.post("register/", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data[0]);
  }
};

export const userLogin = async (data: LoginFormType) => {
  try {
    const response = await ldap.post("login/", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data[0]);
  }
};

export const tokenValidation = async () => {
  try {
    const response = await ldap.get("validate-token/");
    return response.data;
  } catch (error: any) {
    if (error.message === "Network Error") {
      throw new Error("Network Error: Please try again later.");
    } else {
      throw new Error(error.response.data["message"]);
    }
  }
};
