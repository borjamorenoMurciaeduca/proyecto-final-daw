import { Paper, Slider, Typography, styled } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SwitchDate from './SwitchDate.jsx';
import PropertyDrawerFormat from './propertyDrawerFormats.js';
import { APP_NAME } from '@/commons/config/config.js';

const Drawer = styled(SwipeableDrawer)({
  '& .MuiDrawer-paper': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: 'transparent',
    // backgroundndImage: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const PropertyDrawer = ({
  isDrawerOpen,
  toggleDrawer,
  price,
  handleChangePrices,
  resetFilters,
  toggleDateOrder,
  dateOrder,
}) => {
  const { marks, valueLabelFormat, valuetext } = PropertyDrawerFormat;

  return (
    <>
      <Drawer
        anchor={'left'}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: 340,
          }}
        >
          <List >
            <ListItem>
              <SwitchDate
                toggleDateOrder={toggleDateOrder}
                dateOrder={dateOrder}
              />
            </ListItem>
            <ListItem sx={{ p: 4 }}>
              <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={price}
                onChange={handleChangePrices}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                marks={marks}
                valueLabelFormat={valueLabelFormat}
                disableSwap
                sx={{ width: '95%' }}
              />
            </ListItem>

            <Divider />
            <ListItem>
              <Button onClick={resetFilters}>Reset</Button>
            </ListItem>
          </List>
        </Paper>
        <Typography variant="body2" align="center" noWrap sx={{ position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)' }}>Copyright © {APP_NAME} 2024</Typography>
      </Drawer>
    </>
  );
};

export default PropertyDrawer;
