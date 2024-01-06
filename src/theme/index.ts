import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#202124",
          "&:hover": {
            backgroundColor: "#292929",
          },
        },
        root: {
          borderRadius: "24px",
          padding: "8px 20px",
        },
      },
    },
  },
});

export default theme;
