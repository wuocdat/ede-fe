import { Navigate, createBrowserRouter } from "react-router-dom";
import Translation from "../pages/translation";
import Login from "../pages/login";
import Register from "../pages/register";
import AuthLayout from "../layout/auth";
import MainLayout from "../layout/main";
import Protected from "@/pages/ProtectedPage";
import DataPage from "@/pages/data";
import ProtectedRouteAdmin from "@/pages/ProtectedRouteAdmin";
import AdminPage from "@/pages/admin";
import ProtectedRouteEditor from "@/pages/ProtectedRouteEditor";

export const PAGES_PATH = {
  SIGN_IN: "/auth/login",
  SIGN_UP: "/auth/register",
  DATA: "/data",
  TRANS: "/trans",
  ADMIN: "/admin",
  ALL: "*",
};

const router = createBrowserRouter([
  {
    element: <Protected component={<MainLayout />} />,
    children: [
      {
        path: PAGES_PATH.TRANS,
        element: <ProtectedRouteEditor component={<Translation />} />,
      },
      {
        path: PAGES_PATH.DATA,
        element: <ProtectedRouteAdmin component={<DataPage />} />,
      },
      {
        path: PAGES_PATH.ADMIN,
        element: <ProtectedRouteAdmin component={<AdminPage />} />,
      },
      {
        path: PAGES_PATH.ALL,
        element: <Navigate to={PAGES_PATH.TRANS} replace={true} />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: PAGES_PATH.SIGN_IN,
        element: <Login />,
      },
      {
        path: PAGES_PATH.SIGN_UP,
        element: <Register />,
      },
    ],
  },
]);

export default router;
