import AddButtonModal from '@/components/AddButtonModal';
import PropertyCard from '@/components/PropertyCard';
import useProperties from '@/hooks/useProperties';
import useUser from '@/hooks/useUser';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Chip,
  Fab,
  Grid,
  Pagination,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropertyDrawer from './components/PropertyDrawer';
import { useSnackbar } from 'notistack';
import parser from '@/utils/parser';
import i18n from '@/commons/i18n/i18n';

const PROPERTIES_MAX = 6;
const PROPERTIES_MIN = 0;
const MIN_DISTANCE = 5;
const INITIAL_PRICE = [0, Infinity];

const MyProperties = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [price, setPrice] = useState(INITIAL_PRICE);
  const [dateOrder, setDateOrder] = useState('desc');
  const [priceOrder, setPriceOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [location, setLocation] = useState('');

  const { user, setUser } = useUser();
  const theme = useTheme();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { properties } = useProperties();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const toggleDrawer = (newOpen) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(newOpen);
  };

  const getUniqueLocations = () => {
    const locationsSet = new Set();
    properties.forEach((property) => {
      if (property.location) {
        locationsSet.add(property.location);
      }
    });

    return Array.from(locationsSet);
  };

  const handleChangePrices = (_, newValue, activeThumb) => {
    setUser((prevState) => ({ ...prevState, currentPage: 1 }));
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < MIN_DISTANCE) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - MIN_DISTANCE);
        setPrice([clamped, clamped + MIN_DISTANCE]);
      } else {
        const clamped = Math.max(newValue[1], MIN_DISTANCE);
        setPrice([clamped - MIN_DISTANCE, clamped]);
      }
    } else {
      setPrice(newValue);
    }
    enqueueSnackbar(t('filter.snackbar.price-range-changed'), {
      variant: 'info',
      preventDuplicate: true,
    });
  };

  const handleLocationChange = (event) => {
    setUser((prevState) => ({ ...prevState, currentPage: 1 }));
    setLocation(event.target.value);
    if (event.target.value === '') {
      enqueueSnackbar(t('filter.snackbar.location-empty'), {
        variant: 'info',
        preventDuplicate: true,
      });
    } else {
      enqueueSnackbar(
        `${t('filter.snackbar.location-changed-to')} ${event.target.value}`,
        {
          variant: 'info',
          preventDuplicate: true,
        }
      );
    }
  };

  const filterPropertiesByPrice = () => {
    const x = properties.filter((property) => {
      return (
        property.price >= price[0] * 10000 && property.price <= price[1] * 10000
      );
    });
    return x;
  };

  const orderPropertiesByDate = (properties) => {
    const sortedProperties = [...properties];
    sortedProperties.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    return sortedProperties;
  };

  const orderPropertiesByPrice = (properties) => {
    const sortedProperties = [...properties];
    sortedProperties.sort((a, b) => {
      return priceOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
    return sortedProperties;
  };

  const filterPropertiesByLocation = (properties) => {
    if (!location) return properties;
    return properties.filter((property) =>
      property.location.includes(location)
    );
  };

  /**
   * Se crea una array vacío y se le añade las propiedades que cumplen con el filtro de precio
   */
  let filteredProperties = [];
  if (price[0] !== 0 || price[1] !== Infinity) {
    filteredProperties = filterPropertiesByPrice();
  } else {
    filteredProperties = [...properties];
  }

  filteredProperties = filterPropertiesByLocation(filteredProperties);

  let locations = getUniqueLocations();

  /**
   * Se ordenan las propiedades por fecha
   * Si hay un filtro de precio se le aplica solo a las propiedades filtradas
   * En otro caso se le aplica el orden a todas las propiedades
   * @countPages: Número de páginas actualizadas que se mostrarán en la paginación
   */
  const orderedProperties =
    orderBy == 'date'
      ? orderPropertiesByDate(filteredProperties)
      : orderPropertiesByPrice(filteredProperties);

  const propertiesPage = orderedProperties.slice(
    PROPERTIES_MIN + (user.currentPage - 1) * PROPERTIES_MAX,
    PROPERTIES_MAX * user.currentPage
  );

  const countPages = Math.ceil(orderedProperties.length / PROPERTIES_MAX);

  const handlePage = (_, v) => {
    if (v == user.currentPage) return;
    setUser((prevState) => ({ ...prevState, currentPage: v }));
  };

  const toggleDateOrder = () => {
    setDateOrder(dateOrder === 'asc' ? 'desc' : 'asc');
    enqueueSnackbar(
      `${t('filter.snackbar.date-order-changed-to')} ${
        dateOrder === 'asc' ? t('filter.switch.desc') : t('filter.switch.asc')
      }`,
      {
        variant: 'info',
        preventDuplicate: true,
      }
    );
  };

  const togglePriceOrder = () => {
    setPriceOrder(priceOrder === 'asc' ? 'desc' : 'asc');
    enqueueSnackbar(
      `${t('filter.snackbar.price-order-changed-to')} ${
        priceOrder === 'asc' ? t('filter.switch.desc') : t('filter.switch.asc')
      }`,
      {
        variant: 'info',
        preventDuplicate: true,
      }
    );
  };

  const resetFilters = () => {
    setPrice(INITIAL_PRICE);
    setDateOrder('desc');
    setOrderBy('date');
    setLocation('');
    enqueueSnackbar(t('filter.snackbar.filters-reseted'), {
      variant: 'info',
      preventDuplicate: true,
    });
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <AddButtonModal />
      <Typography component="h1" variant="h2">
        {t('page.my-properties.title')}
      </Typography>
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        {orderBy === 'date' && (
          <Chip
            size="small"
            label={`${t(`filter.stack-filters.${orderBy}`)} ${t(
              `filter.switch.${dateOrder}`
            )}`}
          />
        )}
        {orderBy === 'price' && (
          <Chip
            size="small"
            label={`${t(`filter.stack-filters.${orderBy}`)} ${t(
              `filter.switch.${priceOrder}`
            )}`}
          />
        )}
        {price == INITIAL_PRICE || (price[0] == 0 && price[1] == 100) ? null : (
          <Chip
            size="small"
            label={`${t(
              'filter.stack-filters.price-range'
            )} ${parser.FormatPrice(
              price[0] * 10000,
              i18n.language,
              false
            )} - ${parser.FormatPrice(price[1] * 10000, i18n.language)}`}
          />
        )}
        {location && (
          <Chip
            size="small"
            label={`${t('filter.stack-filters.location')} ${location}`}
          />
        )}
      </Stack>
      <Zoom
        in={!isDrawerOpen}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Tooltip title={t('filter.tooltip.filter')}>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            onClick={toggleDrawer(true)}
            sx={{
              position: 'fixed',
              left: { xs: 5, lg: 45 },
              top: '20%',
            }}
          >
            <FilterAltIcon />
          </Fab>
        </Tooltip>
      </Zoom>
      <PropertyDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        price={price}
        setPrice={setPrice}
        handleChangePrices={handleChangePrices}
        toggleDateOrder={toggleDateOrder}
        resetFilters={resetFilters}
        dateOrder={dateOrder}
        setOrderBy={setOrderBy}
        orderBy={orderBy}
        priceOrder={priceOrder}
        togglePriceOrder={togglePriceOrder}
        location={location}
        setLocation={handleLocationChange}
        locations={locations}
      />
      <Grid
        container
        sx={{
          minHeight: '75vh',
          mt: 1,
          mb: { md: 4, lg: 'auto' },
        }}
      >
        <Grid
          container
          item
          spacing={2}
          direction="row"
          justifyContent="left"
          alignItems="flex-start"
          pb={{ xs: 7, md: 0 }}
        >
          {propertiesPage.map((property) => (
            <Grid item xs={12} sm={6} lg={4} key={property.property_id}>
              <PropertyCard property={property} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Stack
                spacing={2}
                p={1}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Pagination
                  size={lessThanMedium ? 'small' : 'medium'}
                  count={countPages}
                  page={user.currentPage || 1}
                  onChange={handlePage}
                  variant="text"
                  shape="circular"
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MyProperties;
