import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./subComponents/Header";

const MainLayout = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
