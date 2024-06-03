import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import i18n from '@/commons/i18n/i18n';
import { useTranslation } from 'react-i18next';
import parser from '@/utils/parser';

const PriceTextField = ({ initialPrice, onChange }) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    if (i18n.language === 'en' && initialPrice) {
      const formattedPrice = parseFloat(initialPrice).toLocaleString('en-GB', {
        style: 'decimal',
        minimumFractionDigits: 2,
      });
      setPrice(formattedPrice);
    } else if (i18n.language === 'es' && initialPrice) {
      const formattedPrice = parseFloat(initialPrice).toLocaleString('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
      });
      setPrice(formattedPrice);
    }
  }, [i18n.language, initialPrice]);

  const handleChange = (event) => {
    const newValue = event;
    setPrice(newValue.target.value);
  };

  const handleBlur = () => {
    let parsedPrice;

    if (i18n.language === 'en') {
      parsedPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    } else {
      parsedPrice = parseFloat(price.replace(/[^\d,-]/g, '').replace(',', '.'));
    }

    if (isNaN(parsedPrice)) {
      setPrice('');
      return;
    }

    let formattedPrice;
    if (i18n.language === 'en') {
      formattedPrice = parsedPrice.toLocaleString('en-GB', {
        style: 'decimal',
        minimumFractionDigits: 2,
      });
    } else {
      formattedPrice = parsedPrice.toLocaleString('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
      });
    }

    setPrice(formattedPrice);
    onChange({ target: { name: 'price', value: parsedPrice } });
  };

  return (
    <TextField
      label={t('add-property-form.price')}
      fullWidth
      value={price}
      onChange={handleChange}
      onBlur={handleBlur}
      InputProps={{
        startAdornment: i18n.language === 'en' && (
          <InputAdornment position="start">
            {parser.getCurrency(i18n.language)}
          </InputAdornment>
        ),
        endAdornment: i18n.language !== 'en' && (
          <InputAdornment position="end">
            {parser.getCurrency(i18n.language)}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PriceTextField;
