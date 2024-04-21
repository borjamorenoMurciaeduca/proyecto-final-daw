import { Box, CircularProgress, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './commons/i18n/i18n';
import useAppState from './hooks/useAppState.js';
import Layout from './layout/';
import Login from './pages/auth/Login';
import Register from './pages/auth/register/Register';
import Home from './pages/home/Home';
import InmuebleService from './services/inmuebleService';
import LoginService from './services/loginService';

const App = () => {
  const [view, setView] = useState('login');
  const { state, handleLogin } = useAppState();
  const [loading, setLoading] = useState(false);
  const { user } = state;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      setLoading(true);
      const { token } = JSON.parse(loggedUserJSON);
      (async () => {
        if (token) {
          try {
            LoginService.setToken(token);
            InmuebleService.setToken(token);
            const { data } = await LoginService.user();
            handleLogin(data);
          } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
          } finally {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        } else {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: ' center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  // Aquí se maneja el estado de la app, si el usuario existe y esta en el estado global
  // se muestra la vista de la "app" o la vista del login
  return (
    <I18nextProvider i18n={i18n}>
      {user ? (
        <>
          <Layout />
          <Container maxWidth="lg" sx={{ paddingBottom: 5 }}>
            <Home />
          </Container>
        </>
      ) : (
        <>
          {view === 'login' && <Login setView={setView} />}
          {view === 'register' && <Register setView={setView} />}
        </>
      )}
    </I18nextProvider>
  );
};

export default App;
