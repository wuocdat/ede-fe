import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import AuthLayout from "../layout/auth";
import MainLayout from "../layout/main";

export const PAGES_PATH = {
  HOME: "/",
  SIGN_IN: "/auth/login",
  SIGN_UP: "/auth/register",
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: PAGES_PATH.HOME,
        element: <Home />,
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
