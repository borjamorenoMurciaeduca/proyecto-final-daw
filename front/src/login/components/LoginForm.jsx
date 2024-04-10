import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStateHook from '../../hooks/useAppStateHook.jsx';
import { Copyright } from '../../register/Register.jsx';
import InmuebleService from '../../services/inmuebleService.js';
import LoginService from '../../services/loginService.js';

const LoginForm = ({ setView }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { handleLogin } = useAppStateHook();
  const { t } = useTranslation();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleView = (e) => {
    e.preventDefault();
    setView('register');
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    // const username = data.username;
    // const password = e.target.password.value;
    console.log({ username, password });
    try {
      if (!password) throw new Error('Password is required');
      const res = await LoginService.login({
        username,
        password,
      });
      let { token } = res.data;
      //Añadir los tokens a los servicios de Inmueble y Login
      InmuebleService.setToken(token);
      LoginService.setToken(token);
      //Guardar el usuario y el token en el localStorage
      window.localStorage.setItem('user', JSON.stringify(res.data));
      //Obtener los datos del usuario y los inmuebles
      const { data } = await LoginService.user();
      //Guardamos los datos del usuario en el estado global
      handleLogin(data);
      e.target.username.value = '';
      e.target.password.value = '';
      setError(false);
    } catch (error) {
      console.log(error);
      setError('Error en las credenciales');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('login-form.title')}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleLoginSubmit}
        sx={{ mt: 3 }}
      >
        {error && (
          <Alert severity="error" sx={{ margin: '10px 0px' }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              helperText=""
              id="username"
              name="username"
              label={t('login-form.form.name')}
              fullWidth
              autoFocus
            />
          </Grid>{' '}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">
                {' '}
                {t('login-form.form.password')}
              </InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label={t('login-form.form.password')}
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
              />
              <Box mt={2} mb={2}>
                <Button type="submit" variant="contained" fullWidth>
                  {t('login-form.form.login')}
                </Button>
              </Box>
            </FormControl>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="" variant="body2" onClick={handleView}>
                  {t('login-form.register')}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
};

export default LoginForm;
