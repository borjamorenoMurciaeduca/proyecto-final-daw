import i18n from '@/commons/i18n/i18n';
import parser from '@/utils/parser';
import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NumericTextField = ({
  initialNumber,
  onChange,
  nameField,
  labelField,
  handleError,
  error,
  disabled,
}) => {
  const [numberGiven, setNumberGiven] = useState('');
  const [customNameField] = useState(nameField);
  const [customLabelField] = useState(labelField);
  const { t } = useTranslation();

  useEffect(() => {
    if (initialNumber) {
      const formattedNumber = formatNumber(initialNumber);
      setNumberGiven(formattedNumber);
    }
  }, [initialNumber]);

  const formatNumber = (value) => {
    return parser.FormatNumber(value, i18n.language);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setNumberGiven(newValue);
  };

  const handleBlur = () => {
    let parsedNumber;

    if (i18n.language === 'en') {
      parsedNumber = parseFloat(numberGiven.replace(/[^\d.-]/g, ''));
    } else {
      parsedNumber = parseFloat(
        numberGiven.replace(/[^\d,-]/g, '').replace(',', '.')
      );
    }

    if (isNaN(parsedNumber)) {
      setNumberGiven('');
      handleError(customNameField, t('validation.required-numeric'));
      return;
    }

    if (parsedNumber < 0) {
      handleError(customNameField, t('validation.no-negative'));
      return;
    }

    const formattedNumber = formatNumber(parsedNumber);
    setNumberGiven(formattedNumber);
    onChange({
      target: { name: customNameField, value: parsedNumber },
      type: 'number',
    });
    handleError(customNameField, '');
  };

  return (
    <TextField
      label={customLabelField}
      fullWidth
      error={!!error}
      value={numberGiven}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
      InputProps={{
        endAdornment: <InputAdornment position="end">m²</InputAdornment>,
        inputProps: { min: 0 },
      }}
    />
  );
};

export default NumericTextField;
