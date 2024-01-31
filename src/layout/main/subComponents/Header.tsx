import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { StyledTab, StyledTabs } from "./Tabs";
import { WhiteButton } from "@/components/share/Buttons";
import { APP_NAME, HEAD_TABS } from "@/utils/constants";
import { COLORS } from "@/theme/colors";

const RootContainer = styled.div`
  display: flex;
  padding: 0px 24px;
  align-items: center;
  background-color: ${COLORS.PRIMARY};
  box-shadow: 0 0 4px 0;
`;

const Header = () => {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          {HEAD_TABS.map((item) => (
            <StyledTab label={item.title} />
          ))}
        </StyledTabs>
      </Box>
      <Stack direction="row" alignItems="center" gap={3}>
        <SettingsIcon sx={{ color: "white" }} />
        {/* <Button variant="text" sx={{ color: "white" }}>
          Đăng nhập
        </Button>
        <WhiteButton variant="contained">Đăng ký</WhiteButton> */}
        
      </Stack>
    </RootContainer>
  );
};

export default Header;
