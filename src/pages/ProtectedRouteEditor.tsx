import { FC } from "react";
import useUserStore from "../store/user";
import { Navigate } from "react-router-dom";
import { ERole } from "@/types/enums";
import { PAGES_PATH } from "@/router";

interface ProtectedRouteEditorProps {
  component: JSX.Element;
}

const ProtectedRouteEditor: FC<ProtectedRouteEditorProps> = ({ component }) => {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to={PAGES_PATH.SIGN_IN} />;

  if (user.role === ERole.EDITOR) {
    return component;
  } else {
    return <Navigate to={PAGES_PATH.ADMIN} />;
  }
};

export default ProtectedRouteEditor;
