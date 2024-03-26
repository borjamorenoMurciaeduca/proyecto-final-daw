import { Box, Typography } from '@mui/material';
import DashboardCard from './components/DashboardCard';

const Dashboard = () => {
  const numRepeticiones = 6;
  const repeticiones = Array.from({ length: numRepeticiones }, (_, index) => (
    <DashboardCard key={index} />
  ));
  return (
    <>
      <Typography variant="h1">Mis viviendas</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {repeticiones}
      </Box>
    </>
  );
};
export default Dashboard;
