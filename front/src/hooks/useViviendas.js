import { useContext } from 'react';
import { ViviendasContext } from '../contexts/ViviendasProvider';

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
