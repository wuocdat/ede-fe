import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthServices from "@/service/auth.services";
import { toast } from "react-toastify";
import TokenService from "@/service/token.services";
import { Navigate, useNavigate } from "react-router-dom";
import useUserStore from "@/store/user";
import LoadingOverlay from "@/components/share/LoadingOverLay";

const Login = () => {
  const defaultTheme = createTheme();

  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.setUser);

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    const username = data.get("username");
    const password = data.get("password");
    if (!username) {
      toast.error("Chưa điền tên đăng nhập");
      return;
    }
    if (!password) {
      toast.error("Chưa nhập mật khẩu");
      return;
    }

    setLoading(true);

    try {
      const { data } = await AuthServices.login({
        username: username.toString(),
        password: password.toString(),
      });
      if (data) {
        TokenService.saveToken(data.access_token);
        updateUser(data.user);
        toast.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập không thành công");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading && <LoadingOverlay />}
          <Avatar style={{ backgroundColor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng Nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ghi nhớ tài khoản"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "black" }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  style={{ color: "black", textDecorationColor: "none" }}
                >
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  style={{ color: "black", textDecorationColor: "none" }}
                >
                  {"Không có tài khoản? Đăng kí"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default Login;
