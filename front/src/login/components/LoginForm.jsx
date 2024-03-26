import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import InmuebleService from '../../services/inmuebleService.js';
import LoginService from '../../services/loginService.js';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useContext(AppContext);
  const [error, setError] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      if (!password) throw new Error('Password is required');
      const { data } = await LoginService.login({
        username,
        password,
      });
      InmuebleService.setToken(data.token);
      handleLogin(data);
      window.localStorage.setItem('user', JSON.stringify(data));
      e.target.username.value = '';
      e.target.password.value = '';
      setError(false);
    } catch (error) {
      console.log(error);
      setError('Error en las credenciales`');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleLoginSubmit}>
        <Box mb={2}>
          <FormControl fullWidth>
            <TextField helperText="" id="username" label="Name" />
          </FormControl>
        </Box>
        <FormControl fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
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
            label="Password"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
};

export default LoginForm;
