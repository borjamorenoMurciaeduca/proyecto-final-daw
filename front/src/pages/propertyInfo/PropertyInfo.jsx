import { useParams } from 'react-router-dom';

import PageLoader from '@/components/PageLoader';
import propertyService from '@/services/propertyService';
import RestoreIcon from '@mui/icons-material/Restore';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PriceHistory from './components/PriceHistory';
/**
 * https://mui.com/x/api/charts/line-chart/
 * En progreso
 *
 */
const PropertyInfo = () => {
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([]);
  const [view, setView] = useState(0);
  let { property_id } = useParams();

  // const dateArrayN = (n) => {
  //   return Array.from({ length: n }, (_, i) => {
  //     const date = new Date();
  //     date.setDate(date.getDate() - i);
  //     return date.toLocaleDateString('es-ES', {
  //       year: 'numeric',
  //       month: '2-digit',
  //       day: '2-digit',
  //     });
  //   }).reverse();
  // };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // El mes es indexado desde 0, por eso se le suma 1
    const year = dateObject.getFullYear().toString().slice(-2);
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    (async () => {
      try {
        let { data } = await propertyService.getPropertyPrices({ property_id });
        console.log(data);
        setSeries([]);
        setXAxis([]);
        data.prices
          .filter((item) => item.created_at)
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map((item) => {
            setSeries((prev) => [...prev, parseFloat(item.price)]);
            setXAxis((prev) => [...prev, formatDate(item.updated_at)]);
          });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [property_id]);

  if (!xAxis.length) return <PageLoader />;

  return (
    <>
      <Typography variant="h2">Detalles de vivienda {property_id}</Typography>
      <Grid
        container
        p={5}
        alignContent="center"
        justifyContent="center"
        gap={2}
      >
        <Grid item xs={10}>
          {view == 0 && <PriceHistory xAxis={xAxis} series={series} />}
          {view == 1 && <Typography>Información</Typography>}
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <BottomNavigation
              showLabels
              value={view}
              onChange={(event, newValue) => {
                console.log(newValue);
                setView(newValue);
              }}
            >
              <BottomNavigationAction
                label="Price History"
                icon={<RestoreIcon />}
              />
              <BottomNavigationAction label="Data" icon={<TextSnippetIcon />} />
            </BottomNavigation>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default PropertyInfo;
