import AuthServices from "@/service/auth.services";
import TokenService from "@/service/token.services";
import useUserStore from "@/store/user";
import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  component: JSX.Element;
}

const Protected: FC<ProtectedProps> = ({ component }) => {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.setUser);

  const checkUser = async () => {
    try {
      const { data } = await AuthServices.checkUser();

      if (data) {
        updateUser(data);
      }
    } catch (error) {
      console.error(error);
      TokenService.removeToken();
      updateUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (user) {
    return component;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default Protected;
