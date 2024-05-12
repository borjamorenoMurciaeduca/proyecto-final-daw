import useUser from '@/hooks/useUser';
import useViviendas from '@/hooks/useViviendas';
import {
  Box,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddButtonModal from './components/AddButtonModal';
import PropertyCard from './components/PropertyCard';

const App = () => {
  const { user, setUser } = useUser();

  const theme = useTheme();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { properties } = useViviendas();
  const { t } = useTranslation();

  const propertiesMax = 6;
  const propertiesMin = 0;
  const propertiesPage = properties.slice(
    propertiesMin + (user.currentPage - 1) * propertiesMax,
    propertiesMax * user.currentPage
  );
  const count = Math.ceil(properties.length / propertiesMax);

  const handlePage = (_, v) => {
    if (v == user.currentPage) return;
    setUser((prevState) => ({ ...prevState, currentPage: v }));
  };

  return (
    <>
      <AddButtonModal />
      <Typography component="h1" variant="h2">
        {t('my-homes')}
      </Typography>
      <Box
        sx={{
          minHeight: '75vh',
          display: 'flex',
          mt: 4,
          mb: { md: 4, lg: 'auto' }
        }}
      >
        <Grid container item spacing={2} justifyContent="left">
          {propertiesPage.map((property) => (
            <Grid xs={12} sm={6} lg={4} item key={property.property_id}>
              <PropertyCard property={property} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Stack
                spacing={2}
                p={1}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Pagination
                  size={lessThanMedium ? 'small' : 'medium'}
                  count={count}
                  page={user.currentPage || 1}
                  onChange={handlePage}
                  variant="text"
                  shape="circular"
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default App;
