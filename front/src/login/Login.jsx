import { Container } from '@mui/material';
import LoginForm from './components/LoginForm';

const Login = ({ setView }) => {
  return (
    <Container component="main" maxWidth="xs">
      <LoginForm setView={setView} />
    </Container>
  );
};

export default Login;
