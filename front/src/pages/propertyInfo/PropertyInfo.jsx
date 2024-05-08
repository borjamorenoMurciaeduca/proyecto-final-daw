import { useParams } from 'react-router-dom';

import RestoreIcon from '@mui/icons-material/Restore';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import PriceHistory from './components/PriceHistory';
import PropertyDetails from './components/PropertyDetails';
/**
 * https://mui.com/x/api/charts/line-chart/
 * En progreso
 *
 */
const PropertyInfo = () => {
  const [view, setView] = useState(0);
  let { property_id } = useParams();
  console.log(property_id);

  return (
    <>
      <Typography variant="h2">Detalles de vivienda {property_id}</Typography>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        gap={2}
        mt={4}
      >
        {view == 0 && <PriceHistory propertyId={property_id} />}
        {view == 1 && <PropertyDetails propertyId={property_id} />}
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <BottomNavigation
              showLabels
              value={view}
              onChange={(event, newValue) => {
                console.log(newValue);
                setView(newValue);
              }}
            >
              <BottomNavigationAction
                label="Price History"
                icon={<RestoreIcon />}
              />
              <BottomNavigationAction label="Data" icon={<TextSnippetIcon />} />
            </BottomNavigation>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default PropertyInfo;
