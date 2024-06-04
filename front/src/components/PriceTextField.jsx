import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import i18n from '@/commons/i18n/i18n';
import parser from '@/utils/parser';
import { useTranslation } from 'react-i18next';

const PriceTextField = ({
  initialPrice,
  onChange,
  nameField,
  labelField,
  handleError,
  error,
}) => {
  const [price, setPrice] = useState('');
  const [customNameField] = useState(nameField);
  const [customLabelField] = useState(labelField);
  const { t } = useTranslation();

  useEffect(() => {
    if (initialPrice) {
      const formattedPrice = formatPrice(initialPrice);
      setPrice(formattedPrice);
    }
  }, [initialPrice]);

  const formatPrice = (value) => {
    if (i18n.language === 'en') {
      return parseFloat(value).toLocaleString('en-GB', {
        style: 'decimal',
        minimumFractionDigits: 2,
      });
    } else if (i18n.language === 'es') {
      return parseFloat(value).toLocaleString('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
      });
    }
    return value;
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setPrice(newValue);
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
      handleError(customNameField, t('validation.required-numeric'));
      return;
    }

    if (parsedPrice < 0) {
      handleError(customNameField, t('validation.no-negative'));
      return;
    }

    const formattedPrice = formatPrice(parsedPrice);
    setPrice(formattedPrice);
    onChange({
      target: { name: customNameField, value: parsedPrice },
      type: 'number',
    });
    handleError(customNameField, '');
  };

  return (
    <TextField
      label={customLabelField}
      fullWidth
      error={!!error}
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
