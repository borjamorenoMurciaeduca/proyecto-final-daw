import { ViviendasContext } from '@/contexts/ViviendasProvider';
import { useContext } from 'react';

const useViviendas = () => {
  const { state, setViviendas, addVivienda, handleLogout } =
    useContext(ViviendasContext);
  return {
    state,
    setViviendas,
    addVivienda,
    handleLogout,
  };
};
export default useViviendas;
