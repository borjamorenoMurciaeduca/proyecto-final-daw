import {
  AppBar,
  Box,
  Container,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';

import { APP_NAME } from '@/commons/config/config.js';
import DayNightSwitch from '@/components/DayNightSwitch.jsx';
import { Outlet } from 'react-router-dom';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const LayoutNotLogged = (props) => {
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar color="default">
          <Toolbar>
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
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
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};
export default LayoutNotLogged;
