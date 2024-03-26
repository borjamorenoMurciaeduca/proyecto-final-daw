import { Container, Typography } from '@mui/material';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: ' 100vh',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <Typography variant="h1">LOGIN FORM</Typography>
      <LoginForm />
    </Container>
  );
};

export default Login;
