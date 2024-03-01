import { LoginDto } from "@/types/type.dto";
import api from "./api";
import { API_PATH } from "./path";
import TokenService from "./token.services";

const login = (data: LoginDto) => {
  return api.post(API_PATH.LOGIN, data);
};

const logout = () => {
  TokenService.removeToken();
};

const checkUser = () => {
  return api.get(API_PATH.CHECK);
};

const AuthServices = {
  login,
  logout,
  checkUser,
};

export default AuthServices;
