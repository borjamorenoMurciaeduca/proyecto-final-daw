import { Box, Typography } from '@mui/material';
import useAppStateHook from '../hooks/useAppStateHook';
import DashboardCard from './components/DashboardCard';
import AddButtonModal from './components/AddButtonModal';

const Dashboard = () => {
  // const numRepeticiones = 6;
  // const repeticiones = Array.from({ length: numRepeticiones }, (_, index) => (
  //   <DashboardCard key={index} />
  // ));
  const { state } = useAppStateHook();
  const { usuarioInmuebles } = state;
  console.log(usuarioInmuebles);
  return (
    <>
      <AddButtonModal/>
      <Typography variant="h1">Mis viviendas</Typography>
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
        {/* {repeticiones} */}
      </Box>
    </>
  );
};
export default Dashboard;
