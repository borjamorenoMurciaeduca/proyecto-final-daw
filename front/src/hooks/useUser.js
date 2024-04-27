import { UserContext } from '@/contexts/UserProvider';
import { useContext } from 'react';

export const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
