import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginService from '../services/loginService';

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        IdealistaWatch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Register = ({ setView }) => {
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const credentials = {
      username: dataForm.get('username'),
      password: dataForm.get('password'),
      password_confirmation: dataForm.get('password_confirmation'),
    };
    try {
      console.log(credentials);
      const data = await LoginService.register(credentials);
      console.log(data);
      e.target.username.value = '';
      e.target.password.value = '';
      e.target.password_confirmation.value = '';
      setView('login');
    } catch (error) {
      console.log(error);
      setError('Error en las credenciales');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleView = (e) => {
    e.preventDefault();
    setView('login');
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
        {t('register-form.title')}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <TextField
              required
              fullWidth
              id="password"
              label={t('login-form.form.password')}
              name="password"
              type="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password_confirmation"
              label={t('login-form.form.confirm-password')}
              type="password"
              id="password_confirmation"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t('register-form.register')}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2" onClick={handleView}>
              {/* Already have an account? Sign in */}
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
};

export default Register;
