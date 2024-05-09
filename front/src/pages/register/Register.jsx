import Copyright from '@/components/Copyright';
import LanguageSelector from '@/components/LanguageSelector';
import useNotification from '@/hooks/useNotification';
import userService from '@/services/userService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const credentials = {
      username: dataForm.get('username'),
      password: dataForm.get('password'),
      password_confirmation: dataForm.get('password_confirmation'),
    };
    try {
      if (credentials.password !== credentials.password_confirmation)
        throw new Error('Las contraseñas no coinciden');
      const res = await userService.register(credentials);

      if (res.error) {
        throw new Error(res.error);
      }

      if (res.status === 201) {
        notify('Usuario registrado correctamente', 'success');
        navigate('/auth');
      }
      e.target.username.value = '';
      e.target.password.value = '';
      e.target.password_confirmation.value = '';
    } catch (error) {
      console.warn(error);
      let msg = error.response?.data?.message || error.message;
      notify(msg, 'error');
      setError(msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <Container
      maxWidth="sm"
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        p={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          boxShadow: '2px 2px 45px -15px rgba(0,0,0,0.75)',
          gap: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('register-form.title')}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ margin: '10px 0px' }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name" //???
                name="username"
                required
                fullWidth
                id="username"
                label={t('login-form.form.name')}
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
                  autoComplete="new-password"
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
              <FormControl fullWidth>
                <InputLabel htmlFor="password_confirmation">
                  {t('login-form.form.confirm-password')}
                </InputLabel>
                <OutlinedInput
                  id="password_confirmation"
                  autoComplete="new-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  label={t('login-form.form.confirm-password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
            <Button type="submit" fullWidth variant="contained">
              {t('register-form.register')}
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/auth" variant="body2">
                {t('register-form.login')}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <LanguageSelector />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
