import { RouterProvider } from "react-router-dom";
import router from "./router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
