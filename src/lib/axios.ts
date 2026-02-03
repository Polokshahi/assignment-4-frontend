
import Cookies from "js-cookie";
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:7000/api",
});

api.interceptors.request.use((config : any) => {
  const token = Cookies.get("token"); // কুকি থেকে টোকেন রিড
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;