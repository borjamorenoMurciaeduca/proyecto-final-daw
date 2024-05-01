import { createContext, useReducer } from 'react';
import { viviendasReducer } from './viviendasReducer.js';

export const ViviendasContext = createContext();

const initialState = {
  properties: [],
};
// eslint-disable-next-line react/prop-types
/**
 * * Estado global con los datos de la vivienda
 */
export const ViviendasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(viviendasReducer, initialState);

  const setViviendas = (usuario) => {
    dispatch({
      type: 'SET_VIVIENDAS_USUARIO',
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
    <ViviendasContext.Provider
      value={{ state, setViviendas, handleLogout, addVivienda }}
    >
      {children}
    </ViviendasContext.Provider>
  );
};
