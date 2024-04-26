import useAppState from '@/hooks/useAppState.js';
import loginService from '@/services/loginService.js';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoader from '../../components/PageLoader.jsx';
import { useUser } from '../../context/userProvider.jsx';
import { USER_LOCAL_TOKEN } from '../../strings/defaults.js';

const AuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUpdateUser } = useUser();
  const { handleLogin } = useAppState();
  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem(USER_LOCAL_TOKEN);
      try {
        if (token) {
          let res = await loginService.user();
          if (res?.data?.user?.id) {
            console.log('res', res);
            // guardar datos del usuario en contexto
            setUpdateUser(res?.data?.user);
            console.log('inm ', res?.data?.usuarioInmuebles);
            handleLogin(res?.data?.usuarioInmuebles);
            // setLoading(false);
          } else {
            throw new Error('No se encontró el usuario');
          }
        } else {
          handleSessionError('No se encontró el usuario');
        }
      } catch (e) {
        handleSessionError(e.message);
        console.log(e);
      } finally {
        await new Promise((r) => setTimeout(r, 2000));
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSessionError = (message) => {
    console.warn(message);
    window.localStorage.clear();
    navigate('/auth');
  };

  if (loading) {
    return <PageLoader />;
  }

  return <Outlet />;
};

export default AuthGuard;
