import { createContext, useReducer } from 'react';
import { AppReducer } from './appReduce.js';

export const AppContext = createContext();

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
  const addVivienda = (vivienda) => {
    dispatch({
      type: 'ADD_VIVIENDA',
      payload: vivienda,
    });
  };

  return (
    <AppContext.Provider
      value={{ state, handleLogin, handleLogout, addVivienda }}
    >
      {children}
    </AppContext.Provider>
  );
};
