import { SwipeableDrawer, styled } from '@mui/material';

const DrawerIdeal = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.5)'
        : 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(20px)',
  },
}));

export default DrawerIdeal;
