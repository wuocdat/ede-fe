import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box width="100vw" height="100vh">
      <Outlet />
    </Box>
  );
};

export default MainLayout;
