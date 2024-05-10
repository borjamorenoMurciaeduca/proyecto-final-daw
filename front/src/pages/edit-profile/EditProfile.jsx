import useNotification from '@/hooks/useNotification';
import useUser from '@/hooks/useUser';
import userService from '@/services/userService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useUser();
  const { notify } = useNotification();
  const { t } = useTranslation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const credentials = {
      password: dataForm.get('password'),
      password_confirmation: dataForm.get('password_confirmation'),
    };
    try {
      if (credentials.password !== credentials.password_confirmation)
        throw new Error('Las contraseñas no coinciden');
      const res = await userService.editProfile(credentials);
      if (res.status == 400) {
        throw new Error('No se ha podido actualizar el usuario');
      }
      if (res.error) {
        throw new Error(res.error);
      }
      e.target.password.value = '';
      e.target.password_confirmation.value = '';

      notify('Usuario actualizado correctamente', 'success');
    } catch (error) {
      if (error.response?.data?.message) {
        notify(error.response?.data?.message, 'error');
      } else {
        notify(error.message, 'error');
      }
      console.warn(error);
    }
  };

  return (
    <>
      <Typography variant="h2" component="h1">
        👋 {user.username}
      </Typography>
      <Container
        maxWidth="md"
        component="main"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '40vh',
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Paper sx={{ p: 5 }}>
            <Grid
              item
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              component="form"
              noValidate
              onSubmit={handleSubmitProfile}
            >
              <Grid item xs={12}>
                <Typography variant="h6">Edición personal de perfil</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  disabled
                  value={user.username}
                  id="username"
                  label={t('login-form.form.name')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  disabled
                  value={user.email || 'Sin correo asociado'}
                  id="email"
                  label="email"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">
                    {t('login-form.form.password')}
                  </InputLabel>
                  <OutlinedInput
                    autoFocus
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained">
                  Actualizar cambios
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default EditProfile;
