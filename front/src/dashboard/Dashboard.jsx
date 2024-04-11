import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAppStateHook from '../hooks/useAppStateHook';
import AddButtonModal from './components/AddButtonModal';
import DashboardCard from './components/DashboardCard';

const Dashboard = () => {
  const { state } = useAppStateHook();
  const { t } = useTranslation();
  const { usuarioInmuebles } = state;
  console.log(usuarioInmuebles);
  return (
    <>
      <AddButtonModal />
      <Typography variant="h1">{t('my-homes')}</Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        {usuarioInmuebles.map((inmueble) => (
          <DashboardCard key={inmueble.id} ubicacion={inmueble.ubicacion} />
        ))}
      </Box>
    </>
  );
};
export default Dashboard;
