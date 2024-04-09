import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useAppStateHook from "../../hooks/useAppStateHook.jsx";
import InmuebleService from "../../services/inmuebleService.js";
import LoginService from "../../services/loginService.js";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const { handleLogin } = useAppStateHook();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      if (!password) throw new Error("Password is required");
      const res = await LoginService.login({
        username,
        password,
      });
      let { token } = res.data;
      //Añadir los tokens a los servicios de Inmueble y Login
      InmuebleService.setToken(token);
      LoginService.setToken(token);
      //Guardar el usuario y el token en el localStorage
      window.localStorage.setItem("user", JSON.stringify(res.data));
      //Obtener los datos del usuario y los inmuebles
      const { data } = await LoginService.user();
      //Guardamos los datos del usuario en el estado global
      handleLogin(data);
      e.target.username.value = "";
      e.target.password.value = "";
      setError(false);
    } catch (error) {
      console.log(error);
      setError("Error en las credenciales");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleLoginSubmit}>
        <Box mb={2}>
          <FormControl fullWidth>
            <TextField
              helperText=""
              id="username"
              label={t("login-form.form.name")}
            />
          </FormControl>
        </Box>
        <FormControl fullWidth>
          <InputLabel htmlFor="password">
            {t("login-form.form.password")}
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={t("login-form.form.password")}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              {t("login-form.form.login")}
            </Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
};

export default LoginForm;
