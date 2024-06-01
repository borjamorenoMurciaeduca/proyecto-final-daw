import i18n from '@/commons/i18n/i18n';
import PageLoader from '@/components/PageLoader';
import propertyService from '@/services/propertyService';
import parser from '@/utils/parser';
import { Grid, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PriceHistory = ({ propertyId }) => {
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([]);
  const { t } = useTranslation();

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
            setXAxis((prev) => [...prev, item.updated_at]);
          });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [propertyId]);

  if (!xAxis.length) return <PageLoader />;

  return (
    <Grid item xs={12} md={8}>
      <LineChart
        xAxis={[
          {
            data: xAxis,
            scaleType: 'point',
            label: t('price-history.xAxis.dates'),
            axisLabel: t('price-history.xAxis.dates'),
            valueFormatter: (value) =>
              parser.formatDate(value, i18n.language, false),
          },
        ]}
        yAxis={[
          {
            label: parser.getCurrency(i18n.language),
            scaleType: 'linear',
            valueFormatter: (value) =>
              parser.FormatPrice(value, i18n.language, false),
          },
        ]}
        series={[
          {
            data: series,
            connectNulls: true,
            valueFormatter: (value) => parser.FormatPrice(value, i18n.language),
          },
        ]}
        height={200}
        margin={{ top: 10, bottom: 50, left: 70 }}
        grid={{ vertical: true, horizontal: true }}
      />
      <Grid item xs={12}>
        <Typography>
          {t('price-history.property-average')}{' '}
          {parser.FormatPrice(
            series.reduce((acc, curr) => acc + curr, 0) / series.length,
            i18n.language
          )}
        </Typography>
        <Typography>
          {t('price-history.property-max-price')}{' '}
          {parser.FormatPrice(Math.max(...series), i18n.language)}
        </Typography>
        <Typography>
          {t('price-history.property-min-price')}{' '}
          {parser.FormatPrice(Math.min(...series), i18n.language)}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default PriceHistory;
