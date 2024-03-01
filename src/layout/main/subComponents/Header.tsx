import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { StyledTab, StyledTabs } from "./Tabs";
import { WhiteButton } from "@/components/share/Buttons";
import { APP_NAME, HEAD_TABS } from "@/utils/constants";
import { COLORS } from "@/theme/colors";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TokenService from "@/service/token.services";

const RootContainer = styled.div`
  display: flex;
  padding: 0px 24px;
  align-items: center;
  background-color: ${COLORS.PRIMARY};
  box-shadow: 0 0 4px 0;
`;

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    TokenService.removeToken();
    navigate("/auth/login");
  };

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(HEAD_TABS[newValue].path, { replace: true });
  };

  return (
    <RootContainer>
      <Typography
        variant="h6"
        color="white"
        style={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        {APP_NAME}
      </Typography>
      <Box sx={{ flex: 1, margin: "auto" }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          {HEAD_TABS.map((item, index) => (
            <StyledTab key={index} label={item.title} />
          ))}
        </StyledTabs>
      </Box>
      <Stack direction="row" alignItems="center" gap={3}>
        <SettingsIcon sx={{ color: "white" }} />
        {/* <Button variant="text" sx={{ color: "white" }}>
          Đăng nhập
        </Button>
        <WhiteButton variant="contained">Đăng ký</WhiteButton> */}
        <div>
          <Button
            variant="text"
            sx={{ color: "white" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Nguyen Van A
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </div>
      </Stack>
    </RootContainer>
  );
};

export default Header;
