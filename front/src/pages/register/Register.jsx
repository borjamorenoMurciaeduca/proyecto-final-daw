import Copyright from '@/components/Copyright';
import LanguageSelector from '@/components/LanguageSelector';
import userService from '@/services/userService';
import registerValidationSchema from '@/validation/registerValidation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  FormControl,
  FormHelperText,
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
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      password_confirmation: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      birth_date: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        if (values.password !== values.password_confirmation) {
          throw new Error('Las contraseñas no coinciden');
        }

        const valuesParser = {
          ...values,
          birth_date: dayjs(values.birth_date).format('YYYY/MM/DD'),
        };
        const res = await userService.register(valuesParser);

        if (res.error) {
          throw new Error(res.error);
        }

        if (res.status === 201) {
          setTimeout(() => {
            enqueueSnackbar(t('register-form.form.success'), {
              variant: 'success',
            });
            navigate('/auth');
            formik.resetForm();
          }, 1000);
        }
      } catch (error) {
        console.warn(error);
        let msg = error.response?.data?.message || error.message;
        msg =
          error.response?.data?.data?.username?.[0] ||
          error.response?.data?.data?.email?.[0] ||
          msg;
        enqueueSnackbar(msg, { variant: 'error' });
        setError(msg);
        setTimeout(() => {
          setError(null);
        }, 5000);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    },
    enableReinitialize: true,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('register-form.title')}
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                <TextField
                  autoComplete="username"
                  autoFocus
                  fullWidth
                  name="username"
                  required
                  id="username"
                  placeholder={t('register-form.form.username-placeholder')}
                  label={t('register-form.form.username')}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel
                    required
                    htmlFor="password"
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  >
                    {t('login-form.form.password')}
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    required
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    label={t('login-form.form.password')}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />

                  <FormHelperText
                    id="outlined-password-helper"
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  >
                    {formik.touched.password && formik.errors.password}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel
                    required
                    htmlFor="password_confirmation"
                    error={
                      formik.touched.password_confirmation &&
                      Boolean(formik.errors.password_confirmation)
                    }
                  >
                    {t('login-form.form.confirm-password')}
                  </InputLabel>
                  <OutlinedInput
                    id="password_confirmation"
                    autoComplete="current-password"
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="password_confirmation"
                    label={t('login-form.form.confirm-password')}
                    value={formik.values.password_confirmation}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password_confirmation &&
                      Boolean(formik.errors.password_confirmation)
                    }
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
                  <FormHelperText
                    error={
                      formik.touched.password_confirmation &&
                      Boolean(formik.errors.password_confirmation)
                    }
                  >
                    {formik.touched.password_confirmation &&
                      formik.errors.password_confirmation}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-additional-info"
                    id="panel-additional-info"
                  >
                    <Typography>
                      {t('register-form.form.additional-info')}
                    </Typography>
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
                          value={formik.values.name}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="family-name"
                          name="surname"
                          fullWidth
                          id="surname"
                          label={t('register-form.form.surname')}
                          value={formik.values.surname}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.surname &&
                            Boolean(formik.errors.surname)
                          }
                          helperText={
                            formik.touched.surname && formik.errors.surname
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="email"
                          name="email"
                          placeholder="example@gmail.com"
                          fullWidth
                          id="email"
                          label={t('register-form.form.email')}
                          // helperText={t('register-form.form.email-helper')}
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email // If touched and has errors
                              ? formik.errors.email
                              : t('register-form.form.email-helper')
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="phone"
                          name="phone"
                          placeholder="642 xxx xxx"
                          fullWidth
                          id="phone"
                          label={t('register-form.form.phone')}
                          value={formik.values.phone}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.phone && Boolean(formik.errors.phone)
                          }
                          helperText={
                            formik.touched.phone && formik.errors.phone
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <DatePicker
                          name="birth_date"
                          id="birth_date"
                          label={t('register-form.form.birth-date')}
                          sx={{ width: '100%' }}
                          onChange={(date) => {
                            formik.setFieldValue('birth_date', date);
                          }}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.birth_date
                              ? dayjs(formik.values.birth_date, 'yyyy-MM-dd')
                              : null
                          }
                          error={
                            formik.touched.birth_date &&
                            Boolean(formik.errors.birth_date)
                          }
                          helperText={
                            formik.touched.birth_date &&
                            formik.errors.birth_date
                          }
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                  >
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
                  <Link component={RouterLink} to="/auth" variant="body2">
                    {t('register-form.login')}
                  </Link>
                </Grid>
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

/*
 *  // en desuso con el uso de formik
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
      birth_date: parser.DateToInsert(dataForm.get('birth_date')),
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
          enqueueSnackbar(t('register-form.form.'), {
            variant: 'success',
          });
          navigate('/auth');
        }, 1000);
      }

      e.target.username.value = '';
      e.target.password.value = '';
      e.target.password_confirmation.value = '';
    } catch (error) {
      console.warn(error);
      let msg = error.response?.data?.message || error.message;
      enqueueSnackbar(msg, { variant: 'error' });
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

*/
