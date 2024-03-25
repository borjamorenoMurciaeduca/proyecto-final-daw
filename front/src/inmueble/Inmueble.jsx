import InmuebleService from '../services/inmueble';
export const Inmueble = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const referencia = e.target.referencia.value;
    const ubicacion = e.target.ubicacion.value;
    const tamano = e.target.tamano.value;
    const habitaciones = e.target.habitaciones.value;
    const garaje = e.target.garaje.checked;
    const trastero = e.target.trastero.checked;
    const fechaBajaAnuncio = e.target.fechaBajaAnuncio.value;
    const precio = e.target.precio.value;
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
    const data = await InmuebleService.addInmueble(inmueble);
    console.log(data.res);
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
        />
        <input
          type="text"
          name="ubicacion"
          id="ubicacion"
          placeholder="Ubicación"
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
        <input type="number" name="precio" id="precio" placeholder="Precio" />
        <input
          type="date"
          name="fechaRegistro"
          id="fechaRegistro"
          placeholder="Fecha Registro"
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
