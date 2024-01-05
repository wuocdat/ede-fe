import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box width="100vw" height="100vh">
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
