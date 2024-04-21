import { useContext } from 'react';
import { AppContext } from '../context/AppProvider.jsx';

const useAppState = () => {
  const { state, handleLogin, handleLogout, addVivienda } =
    useContext(AppContext);
  return {
    state,
    handleLogin,
    handleLogout,
    addVivienda,
  };
};
export default useAppState;
