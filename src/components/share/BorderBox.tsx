import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const BorderBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${grey[400]}`,
  borderRadius: "6px",
  paddingBottom: theme.spacing(3),
  margin: theme.spacing(1),
  position: "relative",
}));

export default BorderBox;
