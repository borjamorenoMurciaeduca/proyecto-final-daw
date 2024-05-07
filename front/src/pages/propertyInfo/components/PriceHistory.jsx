import parser from '@/utils/parser';
import { Grid, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const PriceHistory = ({ xAxis, series }) => {
  return (
    <>
      <LineChart
        // colors={['#f00', '#0f0', '#00f']}
        xAxis={[
          {
            data: xAxis,
            scaleType: 'point',
            label: 'Fechas',
            axisLabel: 'Fechas',
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
    </>
  );
};
export default PriceHistory;
