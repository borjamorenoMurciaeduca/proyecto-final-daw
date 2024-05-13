import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';

import { APP_NAME } from '@/commons/config/config.js';
import DayNightSwitch from '@/components/DayNightSwitch.jsx';
import { Outlet, } from 'react-router-dom';

const LayoutNotLogged = () => {
  return (
    <>
      <AppBar color="default" position="fixed" elevation={2}>
        <Container maxWidth="lg" >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {APP_NAME}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ flexGrow: 0, ml: 1 }}>
                <DayNightSwitch />
              </Box>
            </Box>
          </Box>
        </Container >
      </AppBar>
      <Toolbar />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};
export default LayoutNotLogged;
