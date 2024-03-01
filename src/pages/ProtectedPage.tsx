import AuthServices from "@/service/auth.services";
import TokenService from "@/service/token.services";
import { FC, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface ProtectedProps {
  component: JSX.Element;
}

const Protected: FC<ProtectedProps> = ({ component }) => {
  const token = TokenService.getToken();

  const navigate = useNavigate();

  const checkUser = () => {
    AuthServices.checkUser().catch((err) => {
      console.error(err);
      TokenService.removeToken();
      navigate("/auth/login");
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (token) {
    return component;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default Protected;
