import { useReducer } from 'react';
import { AppContext } from './AppContext';
import { AppReducer } from './AppReducer';

const initialState = {
  user: null,
  usuarioInmuebles: [],
};

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const handleLogin = (usuario) => {
    dispatch({
      type: 'LOGIN',
      payload: usuario,
    });
  };
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AppContext.Provider value={{ state, handleLogin, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
};
