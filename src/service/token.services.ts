const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const TokenService = {
  saveToken,
  getToken,
  removeToken,
};

export default TokenService;
