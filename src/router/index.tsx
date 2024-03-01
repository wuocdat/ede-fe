import { Navigate, createBrowserRouter } from "react-router-dom";
import Translation from "../pages/translation";
import Login from "../pages/login";
import Register from "../pages/register";
import AuthLayout from "../layout/auth";
import MainLayout from "../layout/main";
import Protected from "@/pages/ProtectedPage";
import DataPage from "@/pages/data";

export const PAGES_PATH = {
  SIGN_IN: "/auth/login",
  SIGN_UP: "/auth/register",
  DATA: "/data",
  TRANS: "/trans",
  COMMUNITY: "/community",
  ALL: "*",
};

const router = createBrowserRouter([
  {
    element: <Protected component={<MainLayout />} />,
    children: [
      {
        path: PAGES_PATH.TRANS,
        element: <Translation />,
      },
      {
        path: PAGES_PATH.DATA,
        element: <DataPage />,
      },
      {
        path: PAGES_PATH.COMMUNITY,
        element: <Translation />,
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
