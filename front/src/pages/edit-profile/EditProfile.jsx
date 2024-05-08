import useUser from '@/hooks/useUser';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useUser();
  console.log(user);
  const { t } = useTranslation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleEditProfile = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setUserInfo({ ...userInfo, [name]: newValue });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
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
          <Grid item xs={12}>
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
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
          <Button type="submit" fullWidth variant="contained">
            Actualizar cambios
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default EditProfile;
