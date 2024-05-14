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

  const setProperties = (user) => {
    dispatch({
      type: 'SET_PROPERTIES',
      payload: user,
    });
  };

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  const updateNote = (note) => {
    dispatch({
      type: 'UPDATE_NOTE',
      payload: note,
    });
  };

  const removeNote = (note) => {
    dispatch({
      type: 'REMOVE_NOTE',
      payload: note,
    });
  };

  const addNote = (note) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: note,
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
        updateNote,
        removeNote, 
        addNote,
        addProperty,
        updateProperty,
        changeFavoriteProperty
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};
