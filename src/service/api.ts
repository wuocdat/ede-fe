import axios from "axios";
import TokenService from "./token.services";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      if (err.response.status === 401) {
        TokenService.removeToken();
        window.location.replace("/auth/login");
      }
    }
    return Promise.reject(err);
  }
);

export default api;
