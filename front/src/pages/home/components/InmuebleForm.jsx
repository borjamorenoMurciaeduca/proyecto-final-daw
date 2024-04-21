import useAppState from '@/hooks/useAppState.js';
import { useNotification } from '@/hooks/useNotification';
import inmuebleService from '@/services/inmuebleService.js';
import loginService from '@/services/loginService.js';
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
  // const { addVivienda } = useAppState();
  const { handleLogin } = useAppState();
  const [inmuebleValue, setInmuebleValue] = useState({
    referencia: '',
    ubicacion: '',
    precio: '',
    tamano: '',
    habitaciones: '',
    garaje: false,
    trastero: false,
  });

  const { t } = useTranslation();
  const { notify } = useNotification();
  useEffect(() => {
    if (inmuebleData) {
      setInmuebleValue({
        referencia: inmuebleData.referenciaInmueble || '',
        ubicacion: inmuebleData?.ubicacion || '',
        precio: inmuebleData?.precio || '',
        tamano: inmuebleData?.tamanio || '',
        habitaciones: inmuebleData?.habitaciones || '',
        garaje: inmuebleData?.garaje || false,
        trastero: inmuebleData?.trastero || false,
      });
    }
  }, [inmuebleData]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setInmuebleValue({ ...inmuebleValue, [name]: newValue });
  };

  // const baniosValue = inmuebleData?.banios || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0];
      const inmuebleToAdd = {
        ...inmuebleValue,
        referencia: Number(inmuebleValue.referencia),
        fechaRegistro: formattedDate,
      };
      const data = await inmuebleService.addInmueble({ inmuebleToAdd });
      if (data.status === 201) {
        const { data } = await loginService.user();
        handleLogin(data);
        // SI LA RESPUESTA ES CORRECTA, SE AÑADE LA VIVIENDA AL ESTADO GLOBAL
        // no hacemos petición al servidor para obtener las viviendas del usuario
        console.log(data);
        // addVivienda(inmuebleToAdd);
        // setSeverity('success');
        // setMessage('Vivienda añadida con éxito');
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
    if (reason === 'clickaway') {
      return;
    }
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
          id="referencia"
          name="referencia"
          label={t('add-home-form.reference')}
          type="number"
          disabled
          fullWidth
          value={inmuebleValue.referencia}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
          id="ubicacion"
          name="ubicacion"
          label={t('add-home-form.location')}
          fullWidth
          autoFocus
          value={inmuebleValue.ubicacion}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
          id="precio"
          name="precio"
          label={t('add-home-form.price')}
          fullWidth
          type="number"
          value={inmuebleValue.precio}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
          id="tamanioValue"
          name="tamanioValue"
          label={t('add-home-form.size')}
          type="number"
          fullWidth
          value={inmuebleValue.tamano}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          helperText=""
          id="habitaciones"
          name="habitaciones"
          label={t('add-home-form.rooms')}
          fullWidth
          type="number"
          value={inmuebleValue.habitaciones}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={4}>
        <Grid container direction="row" alignContent="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={inmuebleValue.garaje}
                name="garaje"
                onChange={handleInputChange}
              />
            }
            label={t('add-home-form.garage')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={inmuebleValue.trastero}
                name="trastero"
                onChange={handleInputChange}
              />
            }
            label={t('add-home-form.storage')}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <UnstyledTextareaIntroduction desc={t('add-home-form.description')} />
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
