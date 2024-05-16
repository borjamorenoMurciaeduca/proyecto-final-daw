import useUser from '@/hooks/useUser';
import userService from '@/services/userService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, setUser } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      name: dataForm.get('name'),
      surname: dataForm.get('surname'),
      phone: dataForm.get('phone'),
      birth_date: dataForm.get('birth_date'),
    };
    setLoading(true);
    try {
      if (credentials.password !== credentials.password_confirmation)
        throw new Error('Las contraseñas no coinciden');

      const res = await userService.editProfile(credentials);

      if (res.status == 400)
        throw new Error('No se ha podido actualizar el usuario');
      if (res.error) throw new Error(res.error);

      e.target.password.value = '';
      e.target.password_confirmation.value = '';

      setUser((prev) => ({ ...prev, ...res.data }));
      setTimeout(() => {
        setLoading(false);
        navigate('/app');
        enqueueSnackbar('Usuario actualizado correctamente', {
          variant: 'success',
        });
      }, 1000);
    } catch (error) {
      if (error.response?.data?.message) {
        enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
      } else {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
      console.warn(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
                <Typography variant="h6">
                  {t('edit-profile-form.title')}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="given-username"
                  name="username"
                  required
                  fullWidth
                  disabled
                  value={user.username}
                  id="username"
                  label={t('edit-profile-form.form.username')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="given-email"
                  name="email"
                  required
                  fullWidth
                  disabled
                  value={user.email || 'Sin correo asociado'}
                  id="email"
                  label={t('edit-profile-form.form.email')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  defaultValue={user.name || ''}
                  id="name"
                  label={t('edit-profile-form.form.name')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="given-surname"
                  name="surname"
                  fullWidth
                  defaultValue={user.surname || ''}
                  id="surname"
                  label={t('edit-profile-form.form.surname')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="given-phone"
                  name="phone"
                  fullWidth
                  defaultValue={user.phone || ''}
                  id="phone"
                  label={t('edit-profile-form.form.phone')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  name="birth_date"
                  id="birth_date"
                  label={t('register-form.form.birth-date')}
                  sx={{ width: '100%' }}
                  defaultValue={dayjs(user.birth_date)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">
                    {t('edit-profile-form.form.password')}
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    label={t('edit-profile-form.form.password')}
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
                    {t('edit-profile-form.form.confirm-password')}
                  </InputLabel>
                  <OutlinedInput
                    id="password_confirmation"
                    autoComplete="new-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="password_confirmation"
                    label={t('edit-profile-form.form.confirm-password')}
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
                <Box sx={{ position: 'relative' }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                  >
                    {t('edit-profile-form.form.save')}
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
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default EditProfile;
