import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';

import logoIdealista from '@/assets/logo/logo-idealistawatch.png';
import { APP_NAME } from '@/commons/config/config.js';
import DayNightSwitch from '@/components/DayNightSwitch.jsx';
import LanguageFlagSelector from '@/components/LanguageFlagSelector.jsx';
import useUser from '@/hooks/useUser.js';
import cookie from '@/utils/cookie.js';
import { Logout, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import MaterialDayNight from './components/MaterialDayNight';
import { useSnackbar } from 'notistack';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Layout = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleClickProfile = () => {
    handleCloseUserMenu();
    navigate('/app/settings');
  };

  const handleClickHome = () => {
    handleCloseNavMenu();
    resetPage();
    navigate('/app');
  };

  const handleClickHomes = () => {
    handleCloseNavMenu();
    resetPage();
    navigate('/app/my-properties');
  };

  const handleClickFavoriteHomes = () => {
    handleCloseNavMenu();
    resetPage();
    navigate('/app/favorite-properties');
  };

  const handleLogoutMenu = async () => {
    handleCloseUserMenu();
    cookie.clear();
    navigate('/auth');
    enqueueSnackbar(t('snackbar.logout'), {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
    });
  };

  const resetPage = () => setUser((prev) => ({ ...prev, currentPage: 1 }));

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
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
              <Link
                component={RouterLink}
                to="/app"
                onClick={resetPage}
                sx={{ textDecoration: 'none' }}
                color="inherit"
              >
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
              </Link>
              {/* MENU MÓVIL */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem onClick={handleClickHome}>
                    <Typography textAlign="center">
                      {t('page.home.title')}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClickHomes}>
                    <Typography textAlign="center">
                      {t('page.my-properties.title')}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClickFavoriteHomes}>
                    <Typography textAlign="center">
                      {t('page.favorite-properties.title')}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              {/* MENÚ DESKTOP */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  component={RouterLink}
                  to="/app/my-properties"
                  onClick={resetPage}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {t('page.my-properties.title')}
                </Button>
                <Button
                  component={RouterLink}
                  to="/app/favorite-properties"
                  onClick={resetPage}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {t('page.favorite-properties.title')}
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip
                  title={`${t('tooltip.open-settings')} - ${user.username}`}
                >
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username.toUpperCase()}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem style={{ pointerEvents: 'none' }}>
                    <Avatar /> {user.username || ''}
                  </MenuItem>
                  <Box
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      px: 2,
                      py: 1,
                    }}
                  >
                    <MaterialDayNight />
                  </Box>
                  <Divider />
                  <MenuItem onClick={handleClickProfile}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    {t('top-menu.settings.conf')}
                  </MenuItem>
                  <MenuItem onClick={handleLogoutMenu}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('top-menu.settings.logout')}
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0, ml: 1 }}>
                <LanguageFlagSelector />
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  ml: 1,
                  display: { xs: 'none', md: 'block' },
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
export default Layout;
