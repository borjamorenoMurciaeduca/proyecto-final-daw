import { PropertiesContext } from '@/contexts/PropertiesProvider';
import { useContext } from 'react';

const useProperties = () => {
  const {
    state,
    setProperties,
    updateNote,
    removeNote,
    addNote,
    addProperty,
    handleLogout,
    updateProperty,
    changeFavoriteProperty,
    deleteProperties,
    revokeShareProperty,
    updatePriceProperty,
  } = useContext(PropertiesContext);
  return {
    state,
    properties: state.properties,
    setProperties,
    updateNote,
    removeNote,
    addNote,
    addProperty,
    handleLogout,
    updateProperty,
    changeFavoriteProperty,
    deleteProperties,
    revokeShareProperty,
    updatePriceProperty,
  };
};
export default useProperties;
