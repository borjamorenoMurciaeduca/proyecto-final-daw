import { useParams } from 'react-router-dom';

import RestoreIcon from '@mui/icons-material/Restore';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import PriceHistory from './components/PriceHistory';
import PropertyDetails from './components/PropertyDetails';
/**
 * https://mui.com/x/api/charts/line-chart/
 * En progreso
 *
 */

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const PropertyInfo = () => {
  const [view, setView] = useState(0);
  let { property_id } = useParams();
  const theme = useTheme();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Typography component="h1" sx={{ typography: { xs: 'h4', sm: 'h2' } }}>
        Detalles de vivienda {property_id}
      </Typography>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        minHeight={'40vh'}
        gap={2}
        mt={4}
      >
        {view == 0 && <PriceHistory propertyId={property_id} />}
        {view == 1 && <PropertyDetails propertyId={property_id} />}
        {!lessThanMedium ? (
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              display: 'flex',
              position: 'fixed',
              left: { xs: '0', lg: '5%', xl: '15%' },
              top: '30%',
              height: 224,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={view}
              onChange={(event, newValue) => {
                setView(newValue);
              }}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab
                icon={<RestoreIcon />}
                label="Price history"
                {...a11yProps(0)}
              />
              <Tab
                icon={<TextSnippetIcon />}
                label="Details"
                {...a11yProps(1)}
              />
            </Tabs>
            {/* <TabPanel value={view} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={view} index={1}>
            Item Two
          </TabPanel> */}
          </Box>
        ) : (
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
        )}
      </Grid>
    </>
  );
};
export default PropertyInfo;
