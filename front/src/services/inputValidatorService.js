import Inmueble from "../commons/model/inmueble";
import { PALABRAS_CLAVE } from "../commons/config/config";

const validateIdealistaURL = (url) => {

  const regex = /^https?:\/\/(www\.)?idealista\.com\/inmueble\/(\d+)\/?$/;

  const match = url.match(regex);

  if (match) {
    return match[2];
  } else {
    return '';
  }
};

const createInmueble = (data, idioma = "es") => {
  const inmueble = new Inmueble();

  inmueble.referenciaInmueble = data?.data?.id;
  inmueble.dataStatus = data?.data?.status;

  if (data.data.status == "ok") {
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

    inmueble.tipoPropiedad = determinarTipoPropiedad(data, idioma);
  }

  if (data.data.status == "baja") {
    inmueble.fechaBaja = data?.data?.fechaBaja;
  }

  if (data.data.status == "error") {
    return null;
  }

  return inmueble;

}

const determinarTipoPropiedad = (json, idioma) => {

  const textoJson = JSON.stringify(json).toLowerCase();

  const esVivienda = PALABRAS_CLAVE.vivienda[idioma].some(palabra => textoJson.includes(palabra));
  const esGaraje = PALABRAS_CLAVE.garaje[idioma].some(palabra => textoJson.includes(palabra));

  if (esVivienda) {
    return "vivienda";
  } else if (esGaraje) {
    return "garaje";
  } else {
    return "otros";
  }
}

export default { validateIdealistaURL, createInmueble };
