import { ViviendasContext } from '@/contexts/ViviendasProvider';
import { useContext } from 'react';

const useViviendas = () => {
  const { state, setViviendas, addProperty, handleLogout } =
    useContext(ViviendasContext);
  return {
    state,
    properties: state.properties,
    setViviendas,
    addProperty,
    handleLogout,
  };
};
export default useViviendas;
