import loginService from '@/services/loginService.js';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoader from '../../components/PageLoader.jsx';
import { useUser } from '../../context/userProvider.jsx';
import { USER_LOCAL_TOKEN } from '../../strings/defaults.js';
import Cookie from '../../utils/cookie.js';

const AuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUpdateUser } = useUser();

  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem(USER_LOCAL_TOKEN);
      try {
        if (token) {
          let res = await loginService.user();
          if (res?.data?.user?.id) {
            setLoading(false);
            // guardar datos del usuario en contexto
            setUpdateUser(res?.data?.user?.id);
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
    Cookie.clear();
    navigate('/auth');
  };

  if (loading) {
    return <PageLoader />;
  }

  return <Outlet />;
};

export default AuthGuard;
