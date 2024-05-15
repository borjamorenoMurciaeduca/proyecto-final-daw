import AddButtonModal from '@/components/AddButtonModal';
import useProperties from '@/hooks/useProperties';
import {
  Grid,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropertyCard from '../my-homes/components/PropertyCard';

const LastHomes = () => {
  const { properties } = useProperties();
  const { t } = useTranslation();

  const propertiesMax = 6;
  const sortedProperties = properties.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const propertiesPage = sortedProperties.slice(0, propertiesMax);

  return (
    <>
      <AddButtonModal />
      <Typography component="h1" variant="h2">
        {t('last-homes')}
      </Typography>
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
        </Grid>
      </Grid>
    </>
  );
};
export default LastHomes;
