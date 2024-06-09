import {
  AppBar,
  Box,
  Container,
  Link,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';

import logoIdealista from '@/assets/logo/logo-idealistawatch.png';
import { APP_NAME } from '@/commons/config/config.js';
import DayNightSwitch from '@/components/DayNightSwitch.jsx';
import LanguageFlagSelector from '@/components/LanguageFlagSelector.jsx';
import { Outlet, NavLink as RouterLink } from 'react-router-dom';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const LayoutShared = (props) => {
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Box sx={{ mr: 2 }}>
                <Link component={RouterLink} to="/app">
                  <img
                    src={logoIdealista}
                    alt="logo"
                    height="42px"
                    width="42px"
                    style={{ border: '2px solid #000', borderRadius: '8px' }}
                  />
                </Link>
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: 'palette.error.dark',
                  flexGrow: 1,
                }}
              >
                {APP_NAME}
              </Typography>
              <Box sx={{ flexGrow: 0, ml: 1 }}>
                <LanguageFlagSelector />
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  ml: 1,
                }}
              >
                <DayNightSwitch />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};
export default LayoutShared;
