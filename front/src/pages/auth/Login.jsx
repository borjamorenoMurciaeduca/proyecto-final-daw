import idealistaWatchLogo from '@/assets/logo/logo-idealistawatch.png';
import Copyright from '@/components/Copyright';
import LanguageSelector from '@/components/LanguageSelector.jsx';
import useProperties from '@/hooks/useProperties.js';
import useUser from '@/hooks/useUser';
import propertyService from '@/services/propertyService';
import userService from '@/services/userService.js';
import { USER_COOKIE_TOKEN } from '@/strings/defaults';
import cookie from '@/utils/cookie';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setProperties } = useProperties();
  const { setUser } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    setLoading(true);
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

      //Obtener los datos del usuario y los inmuebles
      const property = await propertyService.getAllUserProperties();
      // Seteamos la página actual a 1
      setUser({ ...user, currentPage: 1 });
      setProperties(property.data);

      e.target.username.value = '';
      e.target.password.value = '';

      setError(false);
      navigate('/app', { replace: true });
      enqueueSnackbar(`👋 Bienvenido de nuevo ${user.username}`, {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2000,
      });
    } catch (error) {
      console.warn(error);
      setError('Error en las credenciales');
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
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
        minHeight: '95vh',
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
                autoComplete="username"
                id="username"
                name="username"
                label={t('login-form.form.username')}
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
              <Box sx={{ position: 'relative' }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                >
                  {t('login-form.form.login')}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid
              container
              item
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              mt={1}
            >
              <Grid container item xs={12} sm={6} justifyContent="flex-start">
                <LanguageSelector />
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={6}
                justifyContent={{ xs: 'center', sm: 'flex-end' }}
              >
                <Link component={RouterLink} to="/register" variant="body2">
                  {t('login-form.register')}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Copyright />
      </Paper>
    </Container>
  );
};
export default Login;
