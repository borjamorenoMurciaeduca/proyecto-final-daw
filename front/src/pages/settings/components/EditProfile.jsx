import useUser from '@/hooks/useUser';
import userService from '@/services/userService';
import parser from '@/utils/parser';
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
import { useEffect, useRef, useState } from 'react';
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
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.currentTarget);
    const credentials = {
      password: dataForm.get('password'),
      password_confirmation: dataForm.get('password_confirmation'),
      name: dataForm.get('name'),
      surname: dataForm.get('surname'),
      phone: dataForm.get('phone'),
      birth_date: parser.DateToInsert(dataForm.get('birth_date')),
    };
    setLoading(true);

    try {
      if (credentials.password !== credentials.password_confirmation)
        throw new Error(t('edit-profile-form.error.password'));

      const res = await userService.editProfile(credentials);

      if (res.status == 400) throw new Error(t('edit-profile-form.error.400'));
      if (res.error) throw new Error(res.error);

      e.target.password.value = '';
      e.target.password_confirmation.value = '';

      setUser((prev) => ({ ...prev, ...res.data }));
      setTimeout(() => {
        setLoading(false);
        navigate('/app');
        enqueueSnackbar(t('edit-profile-form.form.success'), {
          variant: 'success',
        });
      }, 1000);
    } catch (error) {
      error.response?.data?.message
        ? enqueueSnackbar(error.response?.data?.message, { variant: 'error' })
        : enqueueSnackbar(error.message, { variant: 'error' });

      console.warn(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={10}
          lg={12}
        >
          <Paper sx={{ p: 5 }}>
            <Grid
              item
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              component="form"
              noValidate
              onSubmit={handleEditProfile}
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
                  value={user.username || undefined}
                  id="username"
                  label={t('edit-profile-form.form.username')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  disabled
                  value={user.email || undefined}
                  id="email"
                  label={t('edit-profile-form.form.email')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
                  inputRef={inputRef}
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  defaultValue={user.name || undefined}
                  id="name"
                  label={t('edit-profile-form.form.name')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="family-name"
                  name="surname"
                  fullWidth
                  defaultValue={user.surname || undefined}
                  id="surname"
                  label={t('edit-profile-form.form.surname')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="tel"
                  name="phone"
                  fullWidth
                  defaultValue={user.phone || undefined}
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
                  defaultValue={
                    user.birth_date ? dayjs(user.birth_date) : undefined
                  }
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
                    autoComplete="current-password"
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
