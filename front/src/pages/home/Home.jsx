import useViviendas from '@/hooks/useViviendas';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddButtonModal from './components/AddButtonModal';
import DashboardCard from './components/DashboardCard';

const Dashboard = () => {
  const { properties } = useViviendas();
  const { t } = useTranslation();

  return (
    <>
      <AddButtonModal />
      <Typography variant="h1">{t('my-homes')}</Typography>
      <Grid container spacing={2} justifyContent="left" alignItems="center">
        {properties.map((property) => (
          <Grid xs={12} md={6} lg={4} item key={property.property_id}>
            <DashboardCard property={property} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default Dashboard;
