import { createContext, useReducer } from 'react';
import { propertiesReducer } from './propertiesReducer.js';

export const PropertiesContext = createContext();

const initialState = {
  properties: [],
};
// eslint-disable-next-line react/prop-types
/**
 * * Estado global con los datos de la vivienda
 */
export const PropertiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertiesReducer, initialState);

  const setProperties = (usuario) => {
    dispatch({
      type: 'SET_PROPERTIES',
      payload: usuario,
    });
  };

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  const addProperty = (property) => {
    dispatch({
      type: 'ADD_PROPERTY',
      payload: property,
    });
  };

  const updateProperty = (property_id) => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: property_id,
    });
  };

  const changeFavoriteProperty = (property_id) => {
    dispatch({
      type: 'CHANGE_FAVORITE_PROPERTY',
      payload: property_id,
    });
  }

  return (
    <PropertiesContext.Provider
      value={{
        state,
        setProperties,
        handleLogout,
        addProperty,
        updateProperty,
        changeFavoriteProperty
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};
