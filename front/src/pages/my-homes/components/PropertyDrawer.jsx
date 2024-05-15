import { Slider, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState } from 'react';

const Drawer = styled(SwipeableDrawer)({
  '& .MuiDrawer-paper': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PropertyDrawer = ({ handleFilterProperties }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(newOpen);
  };

  const [price, setprice] = useState([0, 100]);

  const marks = [
    {
      value: 0,
      label: '0 €',
    },
    {
      value: 20,
      label: '200K €',
    },
    {
      value: 60,
      label: '600K €',
    },
    {
      value: 100,
      label: '1M €',
    },
  ];

  const valueLabelFormat = (value) => {
    if (value === 0) return '0 €';
    if (value === 100) return '1M €';
    return `${value * 10}K €`;
  }


  const minDistance = 10;
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setprice([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setprice([clamped - minDistance, clamped]);
      }
    } else {
      setprice(newValue);
    }
  };

  function valuetext(value) {
    return `${value} €`;
  }

  const list = () => (
    <Box
      sx={{
        width: 320,
      }}
      role="presentation"

    >
      <Box>
        <List>
          <ListItem >
            <Slider
              getAriaLabel={() => 'Minimum distance shift'}
              value={price}
              onChange={handleChange2}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              marks={marks}
              valueLabelFormat={valueLabelFormat}
              disableSwap
              sx={{ width: '95%' }}
            />

          </ListItem>
        </List>

        <Divider />
        <Button onClick={() => handleFilterProperties('price', price)}>Aplicar filtro</Button>
        <Button onClick={() => handleFilterProperties('reset')}>Reset</Button>
      </Box>
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>{'left'}</Button>
      <Drawer
        anchor={'left'}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {list('left')}
      </Drawer>
    </>
  );
};

export default PropertyDrawer;
