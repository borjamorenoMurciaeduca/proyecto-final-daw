import PageLoader from '@/components/PageLoader.jsx';
import useUser from '@/hooks/useUser.js';
import useViviendas from '@/hooks/useViviendas.js';
import propertyService from '@/services/propertyService';
import userService from '@/services/userService.js';
import { USER_COOKIE_TOKEN } from '@/strings/defaults.js';
import cookie from '@/utils/cookie.js';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { setViviendas } = useViviendas();

  useEffect(() => {
    (async () => {
      const token = cookie.get(USER_COOKIE_TOKEN);
      try {
        if (token) {
          let user = await userService.user();
          let properties = await propertyService.getAllUserProperties();
          if (user?.data && properties?.data) {
            // guardar datos del usuario en contexto
            setUser({ ...user.data, currentPage: 1 });
            // guardar los datos de las viviendas en contexto
            setViviendas(properties.data);
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
    cookie.clear();
    navigate('/auth');
  };

  if (loading) {
    return <PageLoader />;
  }
  return <Outlet />;
};

export default AuthGuard;
