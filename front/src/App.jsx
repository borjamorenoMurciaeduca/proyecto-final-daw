import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import Dashboard from './dashboard/Dashboard';
import useAppStateHook from './hooks/useAppStateHook';
import Login from './login/Login';
import Register from './register/Register';
import InmuebleService from './services/inmuebleService';
import LoginService from './services/loginService';
import TopMenu from './topMenu/TopMenu';

const App = () => {
  const [view, setView] = useState('login');
  const { state, handleLogin } = useAppStateHook();
  const { user } = state;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const { token } = JSON.parse(loggedUserJSON);
      const setLoginService = async () => {
        if (token) {
          try {
            LoginService.setToken(token);
            InmuebleService.setToken(token);
            const { data } = await LoginService.user();
            handleLogin(data);
          } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
          }
        }
      };
      setLoginService();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(view);

  // Aquí se maneja el estado de la app, si el usuario existe y esta en el estado global
  // se muestra la vista de la "app" o la vista del login
  return (
    <>
      {user ? (
        <>
          <TopMenu />
          <Container maxWidth="lg">
            <Dashboard />
          </Container>
        </>
      ) : (
        <>
          {view === 'login' && <Login setView={setView} />}
          {view === 'register' && <Register setView={setView} />}
        </>
      )}
      {/* <SignUp /> */}
    </>
  );
};

export default App;
