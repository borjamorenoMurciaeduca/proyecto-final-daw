import PageLoader from '@/components/PageLoader.jsx';
import useProperties from '@/hooks/useProperties.js';
import useUser from '@/hooks/useUser.js';
import propertyService from '@/services/propertyService';
import userService from '@/services/userService.js';
import { USER_COOKIE_TOKEN } from '@/strings/defaults.js';
import cookie from '@/utils/cookie.js';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser, user } = useUser();
  const { setProperties } = useProperties();

  const handleSessionError = useCallback(
    (message) => {
      console.warn(message);
      cookie.clear();
      navigate('/auth', { replace: true });
    },
    [navigate]
  );

  useEffect(() => {
    (async () => {
      const token = cookie.get(USER_COOKIE_TOKEN);
      try {
        if (!token) throw new Error('No se encontró el token de usuario');
        if (!user?.username) {
          let userData = await userService.user();
          let propertiesData = await propertyService.getAllUserProperties();

          if (!userData.data || !propertiesData.data)
            throw new Error('No se encontró el usuario o las propiedades');

          setUser({ ...userData.data, currentPage: 1 });
          setProperties(propertiesData.data);
        }
      } catch (error) {
        handleSessionError(error.message);
        console.log(error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    })();
  }, [user, setUser, setProperties, handleSessionError]);

  if (loading) {
    return <PageLoader />;
  }
  return <Outlet />;
};

export default AuthGuard;
