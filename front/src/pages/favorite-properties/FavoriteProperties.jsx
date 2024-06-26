import AddButtonModal from '@/components/AddButtonModal';
import FakePropertyCard from '@/components/FakePropertyCard';
import PropertyCard from '@/components/PropertyCard';
import useProperties from '@/hooks/useProperties';
import useUser from '@/hooks/useUser';
import {
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const FavoriteProperties = () => {
  const { user, setUser } = useUser();
  const theme = useTheme();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { properties } = useProperties();
  const { t } = useTranslation();

  const favoriteProperties = properties.filter((property) => property.favorite);

  const propertiesMax = 6;
  const propertiesMin = 0;
  const propertiesPage = favoriteProperties.slice(
    propertiesMin + (user.currentPage - 1) * propertiesMax,
    propertiesMax * user.currentPage
  );
  const count = Math.ceil(favoriteProperties.length / propertiesMax);

  const handlePage = (_, v) => {
    if (v == user.currentPage) return;
    setUser((prevState) => ({ ...prevState, currentPage: v }));
  };

  return (
    <>
      <AddButtonModal />
      <Typography component="h1" variant="h2">
        {t('page.favorite-properties.title')}
      </Typography>
      {favoriteProperties.length == 0 && (
        <>
          {t('page.favorite-properties.empty')}

          <Grid
            container
            sx={{
              minHeight: '75vh',
              mt: 4,
              mb: { md: 4, lg: 'auto' },
            }}
          >
            <Grid
              container
              item
              spacing={2}
              direction="row"
              justifyContent="center"
              pb={{ xs: 7, md: 5 }}
              alignItems="stretch"
            >
              {!lessThanMedium && (
                <>
                  <Grid item xs={12} sm={6} lg={4}>
                    <FakePropertyCard disabledCard={true} />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6} lg={4}>
                <FakePropertyCard />
              </Grid>
              {!lessThanMedium && (
                <>
                  <Grid item xs={12} sm={6} lg={4}>
                    <FakePropertyCard disabledCard={true} />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
      {favoriteProperties.length > 0 && (
        <>
          <Grid
            container
            sx={{
              minHeight: '75vh',
              mt: 4,
              mb: { md: 4, lg: 'auto' },
            }}
          >
            <Grid
              container
              item
              spacing={2}
              direction="row"
              justifyContent="left"
              pb={{ xs: 7, md: 5 }}
              alignItems="stretch"
            >
              {propertiesPage.map((property) => (
                <Grid item xs={12} sm={6} lg={4} key={property.property_id}>
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
          </Grid>
        </>
      )}
    </>
  );
};
export default FavoriteProperties;
