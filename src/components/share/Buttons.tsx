import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { COLORS } from "../../theme/colors";
import { grey } from "@mui/material/colors";

export const WhiteButton = styled(Button)({
  backgroundColor: "white",
  borderColor: "white",
  color: COLORS.PRIMARY,
  "&:hover": {
    backgroundColor: grey[300],
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "white",
    borderColor: "white",
  },
  "&:focus": {
    borderColor: "white",
  },
});
