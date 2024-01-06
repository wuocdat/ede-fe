import { Navigate, createBrowserRouter } from "react-router-dom";
import Translation from "../pages/translation";
import Login from "../pages/login";
import Register from "../pages/register";
import AuthLayout from "../layout/auth";
import MainLayout from "../layout/main";

export const PAGES_PATH = {
  SIGN_IN: "/auth/login",
  SIGN_UP: "/auth/register",
  DIC: "/dic",
  TRANS: "/trans",
  COMMUNITY: "/community",
  ALL: "*",
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: PAGES_PATH.TRANS,
        element: <Translation />,
      },
      {
        path: PAGES_PATH.DIC,
        element: <Translation />,
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
