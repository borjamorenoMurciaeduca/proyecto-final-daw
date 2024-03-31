import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useInmueble = () => {
  const { state, handleLogin, handleLogout } = useContext(AppContext);
  return {
    state,
    handleLogin,
    handleLogout,
  };
};
export default useInmueble;
