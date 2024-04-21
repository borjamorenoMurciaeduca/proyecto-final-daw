import { NotificationContext } from '@/context/AppNotificationContext';
import { useContext } from 'react';

export const useNotification = () => {
  const { notify } = useContext(NotificationContext);
  return { notify };
};

export default useNotification;
