import { useTheme } from '@emotion/react';
import RestoreIcon from '@mui/icons-material/Restore';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditProfile from './components/EditProfile';
import useUser from '@/hooks/useUser';
import PropertiesTable from './components/PropertiesTable';

const Settings = () => {
  const [view, setView] = useState(0);
  const { t } = useTranslation();
  const theme = useTheme();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useUser();

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Typography variant="h2" component="h1">
        👋 {user.username || 'Usuario'}
      </Typography>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        minHeight={'40vh'}
        gap={2}
        mt={4}
      >
        {view == 0 && <EditProfile />}
        {view == 1 && <PropertiesTable />}
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
              aria-label={t('property-info.side-panel.aria-label')}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab
                icon={<TextSnippetIcon />}
                label="Perfil"
                {...a11yProps(0)}
              />
              <Tab
                icon={<RestoreIcon />}
                label="Gestionar viviendas"
                {...a11yProps(1)}
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
              onChange={(event, newValue) => {
                setView(newValue);
              }}
            >
              <BottomNavigationAction
                label="Perfil"
                icon={<TextSnippetIcon />}
              />
              <BottomNavigationAction
                label="Gestionar viviendas"
                icon={<RestoreIcon />}
              />
            </BottomNavigation>
          </Paper>
        )}
      </Grid>
    </>
  );
};

export default Settings;
