import idealistaWatchLogo from '@/assets/logo/logo-idealistawatch.png';
import Copyright from '@/components/Copyright';
import LanguageSelector from '@/components/LanguageSelector.jsx';
import useProperties from '@/hooks/useProperties.js';
import useUser from '@/hooks/useUser';
import propertyService from '@/services/propertyService';
import userService from '@/services/userService.js';
import { USER_COOKIE_TOKEN } from '@/strings/defaults';
import cookie from '@/utils/cookie';
import loginValidationSchema from '@/validation/loginValidation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
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
import { useFormik } from 'formik';
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

  const formik = useFormik({
    initialValues: { identifier: '', password: '' },
    validationSchema: loginValidationSchema, // Our Yup schema
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Validación adicional si es necesario
        if (!values.password) throw new Error('Password is required');

        // Llamada al servicio de login
        const { data: userData } = await userService.login({
          identifier: values.identifier,
          password: values.password,
        });

        let { token, user } = userData;

        // Guardamos el token en una cookie con una duración de 8 horas
        const expirationDateCookie = Date.now() + 8 * 60 * 60 * 1000;
        const expirationSeconds = parseInt(
          ((expirationDateCookie - Date.now()) / 1000).toFixed()
        );
        cookie.set(USER_COOKIE_TOKEN, token, expirationSeconds);

        // Obtener los datos del usuario y los inmuebles
        const { data: propertiesData } =
          await propertyService.getAllUserProperties();
        setUser({ ...user, currentPage: 1 });
        setProperties(propertiesData);

        formik.resetForm(); // Limpiar el formulario

        enqueueSnackbar(`${t('snackbar.login')} ${user.username}`, {
          variant: 'info',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 2000,
        });

        navigate('/app', { replace: true });
      } catch (error) {
        console.warn(error);
        setError(t('snackbar.login-error'));
        setTimeout(() => {
          setError(null);
        }, 5000);
      } finally {
        setLoading(false);
      }
    },
    enableReinitialize: true,
  });

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
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ margin: '10px 0px' }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                id="identifier"
                name="identifier"
                label={t('login-form.form.identifier')}
                onBlur={formik.handleBlur}
                value={formik.values.identifier}
                onChange={formik.handleChange}
                error={
                  formik.touched.identifier && Boolean(formik.errors.identifier)
                }
                helperText={
                  formik.touched.identifier && formik.errors.identifier
                }
                fullWidth
                autoFocus
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel
                  htmlFor="password"
                  error={
                    Boolean(formik.errors.password) && formik.touched.password
                  }
                >
                  {t('login-form.form.password')}
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label={t('login-form.form.password')}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  id="outlined-weight-helper-text"
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                >
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
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
