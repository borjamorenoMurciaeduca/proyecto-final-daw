import { APP_NAME } from '@/commons/config/config.js';
import DayNightSwitch from '@/components/DayNightSwitch.jsx';
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
import { Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

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
                <Link
                  component={RouterLink}
                  to="/auth"
                  sx={{ textDecoration: 'none' }}
                  color="inherit"
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
                </Link>
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
