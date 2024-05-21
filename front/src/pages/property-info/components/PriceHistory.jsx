import PageLoader from '@/components/PageLoader';
import propertyService from '@/services/propertyService';
import parser from '@/utils/parser';
import { Grid, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';

const PriceHistory = ({ propertyId }) => {
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let { data: propertyPrices } =
          await propertyService.getPropertyPrices(propertyId);
        setSeries([]);
        setXAxis([]);
        propertyPrices.prices
          .filter((item) => item.created_at)
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map((item) => {
            setSeries((prev) => [...prev, parseFloat(item.price)]);
            setXAxis((prev) => [...prev, item.updated_at]);
          });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [propertyId]);

  const formatDateWithoutTime = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // El mes es indexado desde 0, por eso se le suma 1
    const year = dateObject.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  if (!xAxis.length) return <PageLoader />;

  return (
    <Grid item xs={12} md={8}>
      <LineChart
        // colors={['#f00', '#0f0', '#00f']}
        xAxis={[
          {
            data: xAxis,
            scaleType: 'point',
            label: 'Fechas',
            axisLabel: 'Fechas',
            valueFormatter: (value) => formatDateWithoutTime(value),
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
