import useUser from '@/hooks/useUser';
import { useTheme } from '@emotion/react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TableViewIcon from '@mui/icons-material/TableView';
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
        my={4}
      >
        {view == 0 && <EditProfile />}
        {view == 1 && <PropertiesTable />}
        {!lessThanMedium ? (
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              position: 'fixed',
              left: { xs: '0', lg: '5%', xl: '15%' },
              top: '30%',
            }}
          >
            <Tabs
              orientation="vertical"
              variant="standard"
              value={view}
              onChange={(_, newValue) => {
                setView(newValue);
              }}
              aria-label={t('property-info.side-panel.aria-label')}
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                maxWidth: 100,
              }}
            >
              <Tab
                icon={<ManageAccountsIcon />}
                label="Perfil"
                {...a11yProps(0)}
              />
              <Tab
                icon={<TableViewIcon />}
                label="Gestionar viviendas"
                wrapped
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
              zIndex: 2,
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
                label="Perfil"
                icon={<ManageAccountsIcon />}
              />
              <BottomNavigationAction
                label="Gestionar viviendas"
                icon={<TableViewIcon />}
              />
            </BottomNavigation>
          </Paper>
        )}
      </Grid>
    </>
  );
};

export default Settings;
