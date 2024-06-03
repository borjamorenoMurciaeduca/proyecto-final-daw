import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UnstyledTextareaIntroduction from './TextAreaAutoSize';
import PropertyTypeSelect from './PropertyTypeSelect';
import parser from '@/utils/parser';
import i18n from '@/commons/i18n/i18n';
import PriceTextField from './PriceTextField';

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
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

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
      setRawPrice(
        property?.price ? formatPriceToDB(priceConverted).toString() : ''
      );
    } else {
      setRawPrice(property?.price ? property.price.toString() : '');
    }
  }, [property]);

  const formatPriceToDB = (value) => {
    return parser.FormatPriceToDB(value, i18n.language);
  };

  const formatPriceLang = (value) => {
    return parser.FormatPriceLang(value, i18n.language);
  };

  const formatPrice = (value) => {
    return parser.FormatPrice(value, i18n.language, false);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (name === 'price') {
      setRawPrice(newValue);
    }
    setPropertiesValues({ ...propertiesValues, [name]: newValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
          helperText=""
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
          helperText=""
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
          helperText=""
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
          id="price"
          name="price"
          initialPrice={rawPrice}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
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
        />
      </Grid>
      <Grid item xs={3} md={2}>
        <TextField
          helperText=""
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
          helperText=""
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
          desc={t('add-property-form.description')}
          name="description"
          defaultValue={propertiesValues.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Button type="submit" variant="contained" fullWidth>
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
