import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';
import { Dashboard } from './dashboard/Dashboard';
import InmuebleForm from './inmuebleForm/InmuebleForm';
import Login from './login/Login';
import inmuebleService from './services/inmuebleService';
import TopMenu from './topMenu/TopMenu';

const App = () => {
  const { state, handleLogin } = useContext(AppContext);
  const { user } = state;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      handleLogin(user);
      inmuebleService.setToken(user.token);
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <TopMenu />
          <Container>
            <Dashboard />
            <InmuebleForm />
          </Container>
        </>
      ) : (
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
          <Login />
        </Container>
      )}
    </>
  );
};

export default App;
