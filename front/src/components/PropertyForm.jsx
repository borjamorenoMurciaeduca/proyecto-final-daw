import i18n from '@/commons/i18n/i18n';
import parser from '@/utils/parser';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NumericTextField from './NumericTextField';
import PriceTextField from './PriceTextField';
import PropertyTypeSelect from './PropertyTypeSelect';
import UnstyledTextareaIntroduction from './TextAreaAutoSize';

const PropertyForm = ({
  property = {},
  handleCloseDialog,
  edit,
  handleSubmit,
}) => {
  const [propertiesValues, setPropertiesValues] = useState({
    property_id: '',
    title: '',
    location: '',
    price: 0,
    size: 0,
    rooms: 0,
    garage: false,
    storage_room: false,
    bath_rooms: 0,
    description: '',
    url_image: '',
    type_property: '',
  });
  const [rawPrice, setRawPrice] = useState('');
  const [rawSize, setRawSize] = useState('');
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    setPropertiesValues({
      property_id: property?.property_id || '',
      title: property?.title || '',
      location: property?.location || '',
      price: property?.price || 0,
      size: property?.size || 0,
      rooms: property?.rooms || 0,
      garage: property?.garage || false,
      storage_room: property?.storage_room || false,
      bath_rooms: property?.bath_rooms || 0,
      description: property?.description || '',
      url_image: property?.url_image || '',
      type_property: property?.type_property || '',
    });
    if (i18n.language === 'en') {
      const priceConverted = formatPrice(property.price);
      const sizeConverted = formatNumber(property.size);
      setRawPrice(
        property?.price ? formatNumberToDB(priceConverted).toString() : ''
      );
      setRawSize(
        property?.size ? formatNumberToDB(sizeConverted).toString() : ''
      );
    } else {
      setRawPrice(property?.price ? property.price.toString() : '');
      setRawSize(property?.size ? property.size.toString() : '');
    }
  }, [property]);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== '');
    setDisabledSubmit(hasErrors);
  }, [errors]);

  const formatNumberToDB = (value) => {
    return parser.FormatNumberToDB(value, i18n.language);
  };

  const formatPriceLang = (value) => {
    return parser.FormatPriceLang(value, i18n.language);
  };

  const formatPrice = (value) => {
    return parser.FormatPrice(value, i18n.language, false);
  };

  const formatNumber = (value) => {
    return parser.FormatNumber(value, i18n.language);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue = type === 'checkbox' ? checked : value;

    let error = '';
    if (type === 'number') {
      if (newValue === '') {
        error = t('validation.required-numeric');
      }
      if (newValue < 0) {
        error = t('validation.no-negative');
      }
      if (['rooms', 'bath_rooms'].includes(name) && value % 1 !== 0) {
        error = t('validation.integer-only');
      }
    } else if (type === 'text' && newValue.trim() === '') {
      error = t('validation.required');
    }

    setErrors({ ...errors, [name]: error });

    if (name === 'price') {
      setRawPrice(newValue);
    }
    if (name === 'size') {
      setRawSize(newValue);
    }
    setPropertiesValues({ ...propertiesValues, [name]: newValue });
  };

  const handleFieldError = (name, error) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    Object.keys(propertiesValues).forEach((key) => {
      if (propertiesValues[key] === '' || propertiesValues[key] < 0) {
        formErrors[key] = t('validation.required');
      }
    });
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const inmuebleToAdd = {
        ...propertiesValues,
        property_id: Number(propertiesValues.property_id),
        price: formatPriceLang(propertiesValues.price),
      };
      await handleSubmit(inmuebleToAdd);
      handleCloseDialog();
    } catch (error) {
      const msg =
        error?.response?.data?.message || 'Error al procesar la propiedad';
      enqueueSnackbar(msg, { variant: 'error' });
      console.error('Error al procesar la propiedad:', error);
    }
  };

  return (
    <Grid
      item
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      component="form"
      noValidate
      onSubmit={onSubmit}
    >
      <Grid item xs={12} md={4}>
        <TextField
          error={!!errors.property_id}
          id="property_id"
          name="property_id"
          label={t('add-property-form.reference')}
          type="number"
          disabled
          fullWidth
          value={propertiesValues.property_id}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          error={!!errors.title}
          id="title"
          name="title"
          label={t('add-property-form.title')}
          fullWidth
          autoFocus
          value={propertiesValues.title}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          error={!!errors.location}
          id="location"
          name="location"
          label={t('add-property-form.location')}
          fullWidth
          autoFocus
          value={propertiesValues.location}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <PriceTextField
          error={!!errors.price}
          id="price"
          name="price"
          type="number"
          nameField="price"
          labelField={t('add-property-form.price')}
          initialPrice={rawPrice}
          onChange={handleInputChange}
          handleError={handleFieldError}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <NumericTextField
          error={!!errors.size}
          id="size"
          name="size"
          type="number"
          nameField="size"
          labelField={t('add-property-form.size')}
          initialNumber={rawSize}
          onChange={handleInputChange}
          handleError={handleFieldError}
        />
        {/* <TextField
          error={!!errors.size}
          id="size"
          name="size"
          label={t('add-property-form.size')}
          type="number"
          fullWidth
          value={propertiesValues.size}
          InputProps={{
            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
            inputProps: { min: 0 },
          }}
          onChange={handleInputChange}
        /> */}
      </Grid>
      <Grid item xs={3} md={2}>
        <TextField
          error={!!errors.rooms}
          id="rooms"
          name="rooms"
          label={t('add-property-form.rooms')}
          fullWidth
          type="number"
          InputProps={{
            inputProps: { min: 0 },
          }}
          value={propertiesValues.rooms}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={3} md={2}>
        <TextField
          error={!!errors.bath_rooms}
          id="bath_rooms"
          name="bath_rooms"
          label={t('add-property-form.bath_rooms')}
          fullWidth
          type="number"
          InputProps={{
            inputProps: { min: 0 },
          }}
          value={propertiesValues.bath_rooms}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <PropertyTypeSelect
          id="type_property"
          name="type_property"
          propertyValue={propertiesValues.type_property}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <Grid
          container
          direction="row"
          alignContent="center"
          justifyContent={{ xs: 'space-evenly', md: 'flex-start' }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={propertiesValues.garage}
                name="garage"
                onChange={handleInputChange}
              />
            }
            label={t('add-property-form.garage')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={propertiesValues.storage_room}
                name="storage_room"
                onChange={handleInputChange}
              />
            }
            label={t('add-property-form.storage')}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <UnstyledTextareaIntroduction
          error={!!errors.description}
          desc={t('add-property-form.description')}
          name="description"
          defaultValue={propertiesValues.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        {Object.keys(errors).map(
          (key) =>
            errors[key] != '' && (
              <Chip
                key={key}
                size="small"
                label={`${t('validation.the-field')} "${t(
                  `add-property-form.${key}`
                ).toLowerCase()}" ${errors[key]}`}
                sx={{
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  margin: '4px',
                }}
              />
            )
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={disabledSubmit}
        >
          {edit
            ? t('property-info.edit.button-edit')
            : t('add-property-form.add-property')}
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          color="error"
          onClick={handleCloseDialog}
        >
          {t('add-property-form.cancel')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PropertyForm;
