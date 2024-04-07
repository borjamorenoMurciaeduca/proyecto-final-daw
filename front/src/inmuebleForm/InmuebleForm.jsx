import { Alert, Slide, Snackbar } from '@mui/material';
import { useState } from 'react';
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

  const referenciaValue = inmuebleData?.idInmueble || '';
  const ubicacionValue = inmuebleData?.data?.location || '';
  const precioValue = inmuebleData?.data?.price || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const referencia = inmuebleData?.idInmueble || e.target.referencia.value;
    const ubicacion = inmuebleData?.location || e.target.ubicacion.value;
    const tamano = e.target.tamano.value;
    const habitaciones = e.target.habitaciones.value;
    const garaje = e.target.garaje.checked;
    const trastero = e.target.trastero.checked;
    const fechaBajaAnuncio = e.target.fechaBajaAnuncio.value;
    const precio = inmuebleData?.price || e.target.precio.value;
    const fechaRegistro = e.target.fechaRegistro.value;
    const inmueble = {
      referencia,
      ubicacion,
      tamano,
      habitaciones,
      garaje,
      trastero,
      fechaBajaAnuncio,
      precio,
      fechaRegistro,
    };
    
    try {
      const data = await InmuebleService.addInmueble(inmueble);
      if (data.status === 201) {
        const { data } = await loginService.user();
        handleLogin(data);
        setSeverity('success');
        setMessage('Vivienda añadida con éxito');

        console.log('Datos nuevos al añadir', data);
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
    <>
      <h1>Form Nuevo Vivivenda !TESTEO INSERTAR VIVIENDAS NUEVAS!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="referencia"
          id="referencia"
          placeholder="Referencia"
          value={referenciaValue}
          readOnly
        />
        <input
          type="text"
          name="ubicacion"
          id="ubicacion"
          placeholder="Ubicación"
          value={ubicacionValue}
        />
        <input type="number" name="tamano" id="tamano" placeholder="Tamaño" />
        <input
          type="number"
          name="habitaciones"
          id="habitaciones"
          placeholder="Habitaciones"
        />
        garaje <input type="checkbox" name="garaje" id="garaje" />
        trastero <input type="checkbox" name="trastero" id="trastero" />
        <input
          type="date"
          name="fechaBajaAnuncio"
          id="fechaBajaAnuncio"
          placeholder="Fecha Baja Anuncio"
        />
        <input type="number" name="precio" id="precio" placeholder="Precio" value={precioValue} />
        <input
          type="date"
          name="fechaRegistro"
          id="fechaRegistro"
          placeholder="Fecha Registro"
        />
        <input type="submit" value="Submit" />
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
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
    </>
  );
};

export default Inmueble;
