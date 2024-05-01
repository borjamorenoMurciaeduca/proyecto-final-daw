import { useParams } from 'react-router-dom';

import PageLoader from '@/components/PageLoader';
import propertyService from '@/services/propertyService';
import { Grid } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';

/**
 * https://mui.com/x/api/charts/line-chart/
 * En progreso
 *
 */
const PropertyInfo = () => {
  const [xAxis, setXAxis] = useState([]);
  let { property_id } = useParams();

  const dateArrayN = (n) => {
    return Array.from({ length: n }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }).reverse();
  };

  useEffect(() => {
    (async () => {
      try {
        let res = await propertyService.getPropertyPrices(property_id);
        console.log(res);
        //setXaxis 7 last days from today format date, dd/mm/yyyy
        setXAxis(dateArrayN(7));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [property_id]);
  // console.log(xAxis);
  if (!xAxis.length) return <PageLoader />;
  return (
    <Grid
      container
      p={5}
      alignContent="center"
      justifyContent="center"
      height="90vh"
    >
      <Grid item xs={12}>
        <LineChart
          // colors={['#f00', '#0f0', '#00f']}
          xAxis={[
            {
              data: xAxis,
              scaleType: 'point',
              // scaleType: 'time',
              // valueFormatter: (date) =>
              //   date.toLocaleDateString('fr-FR', {
              //     // you can use undefined as first argument
              //     year: 'numeric',
              //     month: '2-digit',
              //     day: '2-digit',
              //   }),
              // data: [1, 2, 3, 5, 8, 10, 12, 15, 16],
            },
          ]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5, 4],
              // valueFormatter: (value) =>
              //   value == null ? 'NaN' : value.toString(),
            },
            {
              data: [1, 4, 5.5, 2, 15.5, 1.5, 5],
            },
            {
              data: [7, 8, 5, 3, 2, 5.5, 1],
              connectNulls: true,
              valueFormatter: (value) =>
                value == null ? '?' : value.toString(),
            },
          ]}
          height={200}
          margin={{ top: 10, bottom: 20 }}
        />
      </Grid>
    </Grid>
  );
};
export default PropertyInfo;
