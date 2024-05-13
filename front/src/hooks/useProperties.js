import { PropertiesContext } from '@/contexts/PropertiesProvider';
import { useContext } from 'react';

const useProperties = () => {
  const { state, setProperties, addProperty, handleLogout, updateProperty } =
    useContext(PropertiesContext);
  return {
    state,
    properties: state.properties,
    setProperties,
    addProperty,
    handleLogout,
    updateProperty,
  };
};
export default useProperties;
