import { APP_NAME } from '@/commons/config/config.js';
import SwitchIdeal from '@/components/SwitchIdeal';
import { useTheme } from '@emotion/react';
import {
  FormControl,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Slider,
  Toolbar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PropertyDrawerStyle from './PropertyDrawer.styles.js';
import PropertyDrawerFormat from './propertyDrawerFormats.js';

const PropertyDrawer = ({
  isDrawerOpen,
  toggleDrawer,
  price,
  handleChangePrices,
  resetFilters,
  toggleDateOrder,
  dateOrder,
  orderBy,
  setOrderBy,
  togglePriceOrder,
  priceOrder,
}) => {
  const { marks, valueLabelFormat, valuetext } = PropertyDrawerFormat;
  const theme = useTheme();

  return (
    <>
      <PropertyDrawerStyle
        theme={theme}
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
          elevation={24}
          sx={{
            width: 320,
            m: { xs: 0, md: 2 },
          }}
        >
          <List>
            <Toolbar disableGutters />
            <Divider>Order Filters</Divider>
            <ListItem>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderBy}
                  label="Ordenar por"
                  variant="standard"
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  <MenuItem value={'date'}>Fecha</MenuItem>
                  <MenuItem value={'price'}>Precio</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              {orderBy === 'date' ? (
                <SwitchIdeal
                  toggleData={toggleDateOrder}
                  order={dateOrder}
                  label="Date"
                />
              ) : (
                <SwitchIdeal
                  toggleData={togglePriceOrder}
                  order={priceOrder}
                  label="Price"
                />
              )}
            </ListItem>
            <ListItem></ListItem>
            <Divider>Price Range</Divider>
            <ListItem sx={{ px: 4 }}>
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
            <ListItem disablePadding>
              <ListItemButton>
                <Button onClick={resetFilters} color="error">
                  Reset
                </Button>
              </ListItemButton>
            </ListItem>
            <Divider />
            <Toolbar />
            <Typography
              variant="body2"
              align="center"
              noWrap
              sx={{
                position: 'absolute',
                bottom: 5,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              Copyright © {APP_NAME} 2024
            </Typography>
          </List>
        </Paper>
      </PropertyDrawerStyle>
    </>
  );
};

export default PropertyDrawer;
