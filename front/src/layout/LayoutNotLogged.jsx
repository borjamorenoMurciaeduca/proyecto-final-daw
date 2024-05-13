import {
  Box,
  Container,
  Typography,
} from '@mui/material';

import { APP_NAME } from '@/commons/config/config.js';
import DayNightSwitch from '@/components/DayNightSwitch.jsx';
import { Outlet, } from 'react-router-dom';

const LayoutNotLogged = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              textDecoration: 'none',
              color: 'palette.error.dark',
            }}
          >
            {APP_NAME}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/*<Box sx={{ flexGrow: 0, ml: 1 }}>
            <LanguageFlagSelector />
          </Box>*/}
            <Box sx={{ flexGrow: 0, ml: 1 }}>
              <DayNightSwitch />
            </Box>
          </Box>
        </Box>
      </Container >
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};
export default LayoutNotLogged;
