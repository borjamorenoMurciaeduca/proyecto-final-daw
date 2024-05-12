import Copyright from '@/components/Copyright';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LanguageSelector from '@/components/LanguageSelector';
import useNotification from '@/hooks/useNotification';
import userService from '@/services/userService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
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
import { DatePicker } from '@mui/x-date-pickers';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const dataForm = new FormData(e.currentTarget);
    const credentials = {
      username: dataForm.get('username'),
      password: dataForm.get('password'),
      password_confirmation: dataForm.get('password_confirmation'),
      name: dataForm.get('name'),
      surname: dataForm.get('surname'),
      email: dataForm.get('email'),
      phone: dataForm.get('phone'),
      birth_date: dataForm.get('birth_date'),
    };
    try {
      if (credentials.password !== credentials.password_confirmation)
        throw new Error('Las contraseñas no coinciden');
      const res = await userService.register(credentials);

      if (res.error) {
        throw new Error(res.error);
      }

      if (res.status === 201) {

        setTimeout(() => {
          notify('Usuario registrado correctamente', 'success');
          navigate('/auth');
        }, 1000);
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
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <Grid container spacing={2}>
              <Grid container item xs={12} >
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  name="username"
                  required
                  id="username"
                  placeholder={t('register-form.form.username-placeholder')}
                  label={t('register-form.form.username')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel required htmlFor="password">
                    {t('login-form.form.password')}
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    required
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
                  <InputLabel required htmlFor="password_confirmation">
                    {t('login-form.form.confirm-password')}
                  </InputLabel>
                  <OutlinedInput
                    id="password_confirmation"
                    autoComplete="new-password"
                    required
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
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-additional-info"
                    id="panel-additional-info"
                  >
                    <Typography>{t('register-form.form.additional-info')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="given-name"
                          name="name"
                          fullWidth
                          id="name"
                          label={t('register-form.form.name')}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="given-surname"
                          name="surname"
                          fullWidth
                          id="surname"
                          label={t('register-form.form.surname')}
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          autoComplete="given-mail"
                          name="email"
                          placeholder="example@gmail.com"
                          fullWidth
                          id="email"
                          label={t('register-form.form.email')}
                          helperText={t('register-form.form.email-helper')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="given-phone"
                          name="phone"
                          placeholder="642 xxx xxx"
                          fullWidth
                          id="phone"
                          label={t('register-form.form.phone')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <DatePicker name='birth_date' id="birth_date" label={t('register-form.form.birth-date')} />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <Button type="submit" fullWidth variant="contained" disabled={loading}>
                    {t('register-form.form.register')}
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
                {error && (
                  <Alert severity="error" sx={{ margin: '10px 0px' }}>
                    {error}
                  </Alert>
                )}
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
                <Link component={RouterLink} to="/auth" variant="body2">
                  {t('register-form.login')}
                </Link>

              </Grid>
            </Grid>
          </Box>
          <Copyright />
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default Register;
