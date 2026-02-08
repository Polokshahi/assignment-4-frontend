
import Cookies from "js-cookie";
import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: "http://localhost:7000/api",
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = Cookies.get("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;