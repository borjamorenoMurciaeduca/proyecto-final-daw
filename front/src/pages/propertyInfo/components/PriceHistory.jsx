import PageLoader from '@/components/PageLoader';
import propertyService from '@/services/propertyService';
import parser from '@/utils/parser';
import { Grid, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';

const PriceHistory = ({ propertyId }) => {
  console.log('propertyId', propertyId);
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([]);

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
        let { data: propertyPrices } = await propertyService.getPropertyPrices(
          propertyId
        );
        setSeries([]);
        setXAxis([]);
        propertyPrices.prices
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
  }, [propertyId]);

  if (!xAxis.length) return <PageLoader />;
  console.log('xAxis', xAxis);
  return (
    <Grid item xs={12} md={10}>
      <LineChart
        // colors={['#f00', '#0f0', '#00f']}
        xAxis={[
          {
            data: xAxis,
            scaleType: 'point',
            label: 'Fechas',
            axisLabel: 'Fechas',
            // scaleType: 'date',
            // valueFormatter: (date) =>
            //   date.toLocaleDateString('fr-FR', {
            //     year: 'numeric',
            //     month: '2-digit',
            //     day: '2-digit',
            //   }),

            // data: [1, 2, 3, 5, 8, 10, 12, 15, 16],
          },
        ]}
        yAxis={[{ label: '€', scaleType: 'linear' }]}
        series={[
          {
            data: series,
            connectNulls: true,
            // area: true,
            // valueFormatter: (value) =>
            //   value == null ? 'NaN' : value.toString(),
          },
          // {
          //   data: [
          //     907418, 800000, 900000, 1000000, 1100000, 1200000, 1300000,
          //   ],
          // },
          // {
          //   data: [7, 8, 5, 3, 2, 5.5, 1],
          //   connectNulls: true,
          //   valueFormatter: (value) =>
          //     value == null ? '?' : value.toString(),
          // },
        ]}
        height={200}
        margin={{ top: 10, bottom: 50, left: 70 }}
        grid={{ vertical: true, horizontal: true }}
      />
      <Grid item xs={12}>
        <Typography>
          La media de este inmueble es:{' '}
          {parser.FixPrice(
            series.reduce((acc, curr) => acc + curr, 0) / series.length
          )}
          €
        </Typography>
        <Typography>
          Con un precio máximo de: {parser.FixPrice(Math.max(...series))} €
        </Typography>
        <Typography>
          Con un precio mínimo de: {parser.FixPrice(Math.min(...series))} €
        </Typography>
      </Grid>
    </Grid>
  );
};
export default PriceHistory;
