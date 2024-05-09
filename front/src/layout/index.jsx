import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import logoIdealista from '@/assets/logo/logo-idealistawatch.png';
import { APP_NAME } from '@/commons/config/config.js';
import DayNightSwitch from '@/components/DayNightSwitch.jsx';
import LanguageFlagSelector from '@/components/LanguageFlagSelector.jsx';
import useUser from '@/hooks/useUser.js';
import cookie from '@/utils/cookie.js';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
const pages = ['Mis viviendas', 'Pricing'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogoutMenu = async () => {
    setAnchorElUser(null);
    cookie.clear();
    navigate('/auth');
  };

  return (
    <>
      <AppBar position="sticky">
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={t('tooltip.open-settings')}>
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
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {t(`top-menu.settings.profile`)}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogoutMenu}>
                  <Typography textAlign="center">
                    {t('top-menu.settings.logout')}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0, ml: 1 }}>
              <LanguageFlagSelector />
            </Box>
            <Box sx={{ flexGrow: 0, ml: 1 }}>
              <DayNightSwitch />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};
export default Layout;
