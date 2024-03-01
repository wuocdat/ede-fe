import { RouterProvider } from "react-router-dom";
import router from "./router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
