import { useNotification } from '@/hooks/useNotification';
import useViviendas from '@/hooks/useViviendas.js';
import propertyService from '@/services/propertyService.js';
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Slide,
  Snackbar,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UnstyledTextareaIntroduction from './TextAreaAutoSize.jsx';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Inmueble = ({ inmuebleData = {}, handleCloseDialog }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const { addProperty } = useViviendas();

  const [propertiesValues, setPropertiesValues] = useState({
    property_id: '',
    title: '',
    location: '',
    price: '',
    size: '',
    rooms: '',
    garage: false,
    storage_room: false,
    description: '',
  });

  const { t } = useTranslation();
  const { notify } = useNotification();

  useEffect(() => {
    if (inmuebleData) {
      setPropertiesValues({
        property_id: inmuebleData.referenciaInmueble || '',
        title: inmuebleData?.titulo || '',
        location: inmuebleData?.ubicacion || '',
        price: inmuebleData?.precio || '',
        size: inmuebleData?.tamanio || '',
        rooms: inmuebleData?.habitaciones || '',
        garage: inmuebleData?.garaje || false,
        storage_room: inmuebleData?.trastero || false,
        description: inmuebleData.descripcion || '',
      });
    }
  }, [inmuebleData]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setPropertiesValues({ ...propertiesValues, [name]: newValue });
  };

  // const baniosValue = inmuebleData?.banios || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const date = new Date();
      // const formattedDate = date.toISOString().split('T')[0];
      const inmuebleToAdd = {
        ...propertiesValues,
        property_id: Number(propertiesValues.property_id),
        // fechaRegistro: formattedDate,
      };
      // el inmueble se guarda
      const res = await propertyService.addProperty({ inmuebleToAdd });
      /**
       * * NO DEBEMOS LLAMAR A LA API PARA OBTENER LOS DATOS DEL USUARIO
       * ! DEBEMOS AÑADIR LA VIVIENDA AL ESTADO GLOBAL
       * estamos recibiendo otra vez los datos del usuario y las viviendas
       * cuando los datos del usuario lo tenemos y las viviendas también
       * solo necesitamos añadir la vivienda con la estructura correcta al estado global
       */
      if (res.status === 201) {
        addProperty(res.data);
        notify('Vivienda añadida con éxito', 'success');
        handleCloseDialog();
      }
    } catch (error) {
      setSeverity('error');
      const msg = error?.response?.data?.message || 'Error al añadir vivienda';
      setMessage(msg);
      console.error('Error al obtener datos del usuario:', error);
    } finally {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
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
      onSubmit={handleSubmit}
    >
      <Grid item xs={12} md={4}>
        <TextField
          helperText=""
          id="property_id"
          name="property_id"
          label={t('add-home-form.reference')}
          type="number"
          disabled
          fullWidth
          value={propertiesValues.property_id}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={8}>
        <TextField
          helperText=""
          id="title"
          name="title"
          label={t('add-home-form.title')}
          fullWidth
          autoFocus
          value={propertiesValues.title}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
          id="location"
          name="location"
          label={t('add-home-form.location')}
          fullWidth
          autoFocus
          value={propertiesValues.location}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
          id="price"
          name="price"
          label={t('add-home-form.price')}
          fullWidth
          type="number"
          value={propertiesValues.price}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
          id="size"
          name="size"
          label={t('add-home-form.size')}
          type="number"
          fullWidth
          value={propertiesValues.size}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
          id="rooms"
          name="rooms"
          label={t('add-home-form.rooms')}
          fullWidth
          type="number"
          value={propertiesValues.rooms}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={4}>
        <Grid container direction="row" alignContent="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={propertiesValues.garage}
                name="garage"
                onChange={handleInputChange}
              />
            }
            label={t('add-home-form.garage')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={propertiesValues.storage_room}
                name="storage_room"
                onChange={handleInputChange}
              />
            }
            label={t('add-home-form.storage')}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <UnstyledTextareaIntroduction
          desc={t('add-home-form.description')}
          name="description"
          defaultValue={propertiesValues.description}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Button type="submit" variant="contained" fullWidth>
          {t('add-home-form.add-home')}
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
          {t('add-home-form.cancel')}
        </Button>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Inmueble;
