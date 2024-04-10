import Inmueble from "../commons/model/inmueble";

const validateIdealistaURL = (url) => {
 
  const regex = /^https?:\/\/(www\.)?idealista\.com\/inmueble\/(\d+)\/?$/;

  const match = url.match(regex);

  if (match) {
    return match[2];
  } else {
    return '';
  }
};

const createInmueble = (data, idInmueble) => {
  const inmueble = new Inmueble();
  inmueble.referenciaInmueble = idInmueble; 
  inmueble.ubicacion = data?.data?.location;
  inmueble.precio = data?.data?.price;
  inmueble.currency = data?.data?.currency;

  let caracteristicasBasicas = data?.data?.features["Características básicas"];

  if (caracteristicasBasicas) {
    caracteristicasBasicas.forEach(caracteristica => {
      if (caracteristica.toLowerCase().includes('m²')) {
        const numeroMetrosCuadrados = caracteristica.match(/\d+/);
        if (numeroMetrosCuadrados) {
          inmueble.tamanio = parseInt(numeroMetrosCuadrados[0]);
        }
      }
      if (caracteristica.toLowerCase().includes('baño')) {
        const numeroBanos = caracteristica.toLowerCase().match(/\d+/);
        if (numeroBanos) {
          inmueble.banios = parseInt(numeroBanos[0]);
        }
      }
      if (caracteristica.toLowerCase().includes('garaje')) {
          inmueble.garaje = true;
      } 
      if (caracteristica.toLowerCase().includes('trastero')) {
        inmueble.trastero = true;
      } 
      if (caracteristica.toLowerCase().includes('habitaci')) {
        const numeroHabitaciones = caracteristica.match(/\d+/);
        if (numeroHabitaciones) {
          inmueble.habitaciones = parseInt(numeroHabitaciones[0]);
        }
      }
    });
  }

  return inmueble;

}

export default { validateIdealistaURL, createInmueble };
