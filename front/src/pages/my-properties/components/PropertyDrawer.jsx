import Copyright from '@/components/Copyright.jsx';
import SwitchIdeal from '@/components/SwitchIdeal.jsx';
import { useTheme } from '@emotion/react';
import {
  FormControl,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Slider,
  Toolbar,
  Box,
  InputLabel,
} from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PropertyDrawerStyle from './PropertyDrawer.styles.js';
import PropertyDrawerFormat from './propertyDrawerFormats.js';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

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
  location,
  setLocation,
  locations,
}) => {
  const { marks, valueLabelFormat, valuetext } = PropertyDrawerFormat;
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleChangeOrder = (e) => {
    setOrderBy(e.target.value);
    enqueueSnackbar(
      `${t('filter.snackbar.ordered-by')} ${t(
        `filter.order-item-options.${e.target.value}`
      )}`,
      {
        variant: 'info',
      }
    );
  };
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
            <Divider>{t('filter.title')}</Divider>
            <ListItem>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderBy}
                  label={t('filter.label.order-by')}
                  variant="standard"
                  onChange={handleChangeOrder}
                >
                  <MenuItem value={'date'}>
                    {t('filter.order-item-options.date')}
                  </MenuItem>
                  <MenuItem value={'price'}>
                    {t('filter.order-item-options.price')}
                  </MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              {orderBy === 'date' ? (
                <SwitchIdeal
                  toggleData={toggleDateOrder}
                  order={dateOrder}
                  label={t('filter.order-item-options.date')}
                />
              ) : (
                <SwitchIdeal
                  toggleData={togglePriceOrder}
                  order={priceOrder}
                  label={t('filter.order-item-options.price')}
                />
              )}
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="location-select-label">
                  {t('filter.label.location')}
                </InputLabel>
                <Select
                  label={t('filter.label.location')}
                  labelId="location-select-label"
                  variant="standard"
                  id="location-select"
                  value={location}
                  onChange={setLocation}
                >
                  <MenuItem value={''}>
                    {t('filter.label.location-empty')}
                  </MenuItem>
                  {locations.map((location, index) => (
                    <MenuItem key={index} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem></ListItem>
            <Divider>{t('filter.order-item-options.price-range')}</Divider>
            <ListItem sx={{ px: 4 }}>
              <Slider
                getAriaLabel={() => t('filter.label.minimum-distance.shift')}
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
                <Box display="flex" justifyContent="center" width="100%">
                  <Button onClick={resetFilters} color="error">
                    {t('filter.buttons.reset')}
                  </Button>
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider />
            <Toolbar />
            <Copyright
              noWrap
              sx={{
                position: 'absolute',
                bottom: 5,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </List>
        </Paper>
      </PropertyDrawerStyle>
    </>
  );
};

export default PropertyDrawer;
