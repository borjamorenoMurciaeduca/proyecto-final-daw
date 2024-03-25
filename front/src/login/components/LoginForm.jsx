import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import InmuebleService from '../../services/inmueble.js';
import LoginService from '../../services/login.js';

export const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setUserPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(e.target.username.value);
    try {
      if (!username) throw new Error('Username is required');
      if (!userPassword) throw new Error('Password is required');
      console.log({ username, userPassword });
      const user = await LoginService.login({
        username,
        password: userPassword,
      });
      console.log(user);
      console.log(user.token);
      InmuebleService.setToken(user.token);
    } catch (error) {
      console.log(error);
    } finally {
      // e.target.username.value = '';
      // e.target.password.value = '';
      setUserName('');
      setUserPassword('');
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                helperText=""
                id="username"
                label="Name"
                value={username}
                onChange={handleUserNameChange}
              />
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
              onChange={handlePasswordChange}
              value={userPassword}
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Box>
          </FormControl>
        </form>
      </Container>
      {/* 
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <input type="submit" value="Submit" />
      </form> */}
    </>
  );
};

export default LoginForm;
