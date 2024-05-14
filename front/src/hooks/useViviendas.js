import { ViviendasContext } from '@/contexts/ViviendasProvider';
import { useContext } from 'react';

const useViviendas = () => {
  const { state, setViviendas, removeNote, addNote, addProperty, handleLogout } =
    useContext(ViviendasContext);
  return {
    state,
    properties: state.properties,
    setViviendas,
    removeNote,
    addNote,
    addProperty,
    handleLogout,
  };
};
export default useViviendas;
