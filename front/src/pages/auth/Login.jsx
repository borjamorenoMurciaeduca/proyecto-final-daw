import idealistaWatchLogo from '@/assets/logo/logo-idealistawatch.png';
import Copyright from '@/components/Copyright';
import LanguageSelector from '@/components/LanguageSelector.jsx';
import useUser from '@/hooks/useUser';
import useViviendas from '@/hooks/useViviendas.js';
import propertyService from '@/services/propertyService';
import userService from '@/services/userService.js';
import { USER_COOKIE_TOKEN } from '@/strings/defaults';
import cookie from '@/utils/cookie';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setViviendas } = useViviendas();
  const { setUpdateUser } = useUser();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // const handleView = (e) => {
  //   e.preventDefault();
  //   setView('register');
  // };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    // const username = data.username;
    // const password = e.target.password.value;
    try {
      if (!password) throw new Error('Password is required');

      /**
       * userService.login
       * Obtenemos los datos del usuario
       *   guardamos en el estado global de UserProvider los datos del usuario
       *
       * propertyService.getAllUserProperties
       * Obtenemos los inmuebles del usuario
       *  guardamos en el estado global de ViviendasProvider los inmuebles del usuario
       */
      const resUser = await userService.login({
        username,
        password,
      });
      let { token, user } = resUser.data;

      // Guardamos el token en una cookie con una duración de 8 horas

      const expirationDateCookie = Date.now() + 8 * 60 * 60 * 1000;
      const expirationSeconds = parseInt(
        ((expirationDateCookie - Date.now()) / 1000).toFixed()
      );
      cookie.set(USER_COOKIE_TOKEN, token, expirationSeconds);

      // window.localStorage.setItem(USER_LOCAL_TOKEN, token);
      //Guardar el usuario y el token en el localStorage
      // window.localStorage.setItem('user', JSON.stringify(res.data));
      //Obtener los datos del usuario y los inmuebles

      const property = await propertyService.getAllUserProperties();
      setUpdateUser(user);
      setViviendas(property.data);

      e.target.username.value = '';
      e.target.password.value = '';
      setError(false);
      navigate('/app', { replace: true });
    } catch (error) {
      console.warn(error);
      setError('Error en las credenciales');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <Container
      maxWidth="sm"
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={24}
        sx={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // borderRadius: '10px',
          // boxShadow: '2px 2px 45px -15px rgba(0,0,0,0.75)',
          gap: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: '80px',
          }}
        >
          <img
            src={idealistaWatchLogo}
            alt="logo"
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Box>
        <Typography component="h1" variant="h5">
          {t('login-form.title')}
        </Typography>
        <Box component="form" noValidate onSubmit={handleLoginSubmit}>
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
                autoComplete="username"
                label={t('login-form.form.name')}
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">
                  {t('login-form.form.password')}
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  autoComplete="current-password"
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
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                {t('login-form.form.login')}
              </Button>
            </Grid>
            <Grid
              container
              item
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              mt={1}
            >
              <LanguageSelector />
              <Link component={RouterLink} to="/register" variant="body2">
                {t('login-form.register')}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright />
      </Paper>
    </Container>
  );
};
export default Login;
