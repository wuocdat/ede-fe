import { FC } from "react";
import useUserStore from "../store/user";
import { Navigate } from "react-router-dom";
import { ERole } from "@/types/enums";
import { PAGES_PATH } from "@/router";

interface ProtectedRouteAdminProps {
  component: JSX.Element;
}

const ProtectedRouteAdmin: FC<ProtectedRouteAdminProps> = ({ component }) => {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to={PAGES_PATH.SIGN_IN} />;

  if (user.role === ERole.ADMIN) {
    return component;
  } else {
    return <Navigate to={PAGES_PATH.TRANS} />;
  }
};

export default ProtectedRouteAdmin;
