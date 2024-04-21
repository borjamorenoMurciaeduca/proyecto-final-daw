import useAppState from '@/hooks/useAppState';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddButtonModal from './components/AddButtonModal';
import DashboardCard from './components/DashboardCard';

const Dashboard = () => {
  const { state } = useAppState();
  const { t } = useTranslation();
  const { usuarioInmuebles } = state;
  console.log(usuarioInmuebles);
  return (
    <>
      <AddButtonModal />
      <Typography variant="h1">{t('my-homes')}</Typography>
      <Grid container spacing={2} justifyContent="left" alignItems="center">
        {usuarioInmuebles.map((inmueble) => (
          <Grid
            xs={12}
            md={4}
            item
            key={inmueble.id}
            // sx={{
            //   display: 'grid',
            //   gap: 4,
            //   gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            // }}
          >
            <DashboardCard inmueble={inmueble} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default Dashboard;
