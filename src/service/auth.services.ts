import { LoginDto } from "@/types/type.dto";
import api from "./api";
import { API_PATH } from "./path";

const login = (data: LoginDto) => {
  return api.post(API_PATH.LOGIN, data);
};

const AuthServices = {
  login,
};

export default AuthServices;
