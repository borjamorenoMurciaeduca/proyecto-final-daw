import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Slide,
  Snackbar,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStateHook from '../hooks/useAppStateHook.jsx';
import InmuebleService from '../services/inmuebleService.js';
import loginService from '../services/loginService.js';
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Inmueble = ({ inmuebleData }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const { handleLogin } = useAppStateHook();
  const [inmuebleValue, setInmuebleValue] = useState({
    referencia: '',
    ubicacion: '',
    precio: '',
    tamanio: '',
    habitaciones: '',
    garaje: false,
    trastero: false,
  });

  const { t } = useTranslation();

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
      const data = await InmuebleService.addInmueble({ inmuebleToAdd });
      if (data.status === 201) {
        const { data } = await loginService.user();
        handleLogin(data);
        setSeverity('success');
        setMessage('Vivienda añadida con éxito');
      }
    } catch (error) {
      setSeverity('error');
      setMessage('Error al añadir vivienda');
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
    <Container
      maxWidth="md"
      component="main"
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
            <Button type="submit" variant="contained" fullWidth>
              {t('add-home-form.add-home')}
            </Button>
          </Grid>
        </Grid>
      </Box>
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
    </Container>
  );

  // return (
  //     <Snackbar
  //       open={open}
  //       autoHideDuration={6000}
  //       onClose={handleClose}
  //       TransitionComponent={SlideTransition}
  //     >
  //       <Alert
  //         onClose={handleClose}
  //         severity={severity}
  //         variant="filled"
  //         sx={{ width: '100%' }}
  //       >
  //         {message}
  //       </Alert>
  //     </Snackbar>
  //   </>
  // );
};

export default Inmueble;
