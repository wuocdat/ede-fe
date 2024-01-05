import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

export const PAGES_PATH = {
  HOME: "/",
  SIGN_IN: "/auth/login",
  SIGN_UP: "/auth/register",
};

const router = createBrowserRouter([
  {
    path: PAGES_PATH.HOME,
    element: <Home />,
  },
  {
    path: PAGES_PATH.SIGN_IN,
    element: <Login />,
  },
  {
    path: PAGES_PATH.SIGN_UP,
    element: <Register />,
  },
]);

export default router;
