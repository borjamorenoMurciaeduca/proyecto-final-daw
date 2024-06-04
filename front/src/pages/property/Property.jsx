import useProperties from '@/hooks/useProperties';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TimelineIcon from '@mui/icons-material/Timeline';
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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import PriceHistory from './components/PriceHistory';
import PropertyDetails from './components/PropertyDetails';
import PropertyNotes from './components/PropertyNotes';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Property = () => {
  const [title, setTitle] = useState();
  const [view, setView] = useState(0);
  const { t } = useTranslation();
  const { properties } = useProperties();
  let { property_id } = useParams();
  const theme = useTheme();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    const propertyMatch = properties.find(
      (el) => el.property_id == property_id
    );
    !propertyMatch ? navigate('/404') : setTitle(propertyMatch.title);
  }, [properties]);

  return (
    <>
      <Typography component="h1" sx={{ typography: { xs: 'h4', sm: 'h2' } }}>
        {t('property-info.header')} <small>{property_id}</small>
      </Typography>
      <Typography component="h2" sx={{ typography: { xs: 'h6', sm: 'h4' } }}>
        {title}
      </Typography>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        minHeight={'40vh'}
        gap={2}
        mt={4}
      >
        {view == 0 && <PropertyDetails propertyId={property_id} />}
        {view == 1 && <PriceHistory propertyId={property_id} />}
        {view == 2 && <PropertyNotes propertyId={property_id} />}
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
              onChange={(_, newValue) => {
                setView(newValue);
              }}
              aria-label={t('property-info.side-panel.aria-label')}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab
                icon={<TextSnippetIcon />}
                label={t('property-info.side-panel.details')}
                {...a11yProps(0)}
              />
              <Tab
                icon={<TimelineIcon />}
                label={t('property-info.side-panel.price-history')}
                {...a11yProps(1)}
              />
              <Tab
                icon={<TextSnippetIcon />}
                label={t('property-info.side-panel.notes')}
                {...a11yProps(2)}
              />
            </Tabs>
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
              onChange={(_, newValue) => {
                setView(newValue);
              }}
            >
              <BottomNavigationAction
                label={t('property-info.side-panel.details')}
                icon={<TextSnippetIcon />}
              />
              <BottomNavigationAction
                label={t('property-info.side-panel.price-history')}
                icon={<TimelineIcon />}
              />
              <BottomNavigationAction
                label={t('property-info.side-panel.notes')}
                icon={<TextSnippetIcon />}
              />
            </BottomNavigation>
          </Paper>
        )}
      </Grid>
    </>
  );
};
export default Property;
