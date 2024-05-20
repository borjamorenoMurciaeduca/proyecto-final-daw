import { PALABRAS_CLAVE } from '@/commons/config/config';
import Property from '@/models/property';

const validateIdealistaURL = (url) => {
  const regex = /^https?:\/\/(www\.)?idealista\.com\/inmueble\/(\d+)\/?$/;

  const match = url.match(regex);

  if (match) {
    return match[2];
  } else {
    return '';
  }
};

const createInmueble = (data, idioma = 'es') => {
  
  const property = new Property();

  if (data) {
    const inmuebleData = data.data;

    property.property_id = inmuebleData?.id;
    property.status = inmuebleData?.status;

    if (inmuebleData?.status == 'ok') {
      property.title = inmuebleData?.title;
      property.location = inmuebleData?.location;
      property.price = inmuebleData?.price;
      property.currency = inmuebleData?.currency;
      property.description = inmuebleData?.description;
      property.img_url = inmuebleData?.img_url;
  
      let caracteristicasBasicas =
        inmuebleData?.features['Características básicas'];
  
      if (caracteristicasBasicas) {
        caracteristicasBasicas.forEach((caracteristica) => {
          if (caracteristica.toLowerCase().includes('m²')) {
            const numeroMetrosCuadrados = caracteristica.match(/\d+/);
            if (numeroMetrosCuadrados) {
              property.size = parseInt(numeroMetrosCuadrados[0]);
            }
          }
          if (caracteristica.toLowerCase().includes('baño')) {
            const numeroBanos = caracteristica.toLowerCase().match(/\d+/);
            if (numeroBanos) {
              property.bath_rooms = parseInt(numeroBanos[0]);
            }
          }
          if (caracteristica.toLowerCase().includes('garaje')) {
            property.garage = true;
          }
          if (caracteristica.toLowerCase().includes('trastero')) {
            property.storage_room = true;
          }
          if (caracteristica.toLowerCase().includes('habitaci')) {
            const numeroHabitaciones = caracteristica.match(/\d+/);
            if (numeroHabitaciones) {
              property.rooms = parseInt(numeroHabitaciones[0]);
            }
          }
        });
      }
  
      property.type = determinarTipoPropiedad(data, idioma);
    }

    if (inmuebleData?.status == 'baja') {
      property.cancellationDate = inmuebleData?.cancellationDate;
    }
  
    if (inmuebleData?.status == 'error') {
      return null;
    }

  }

  return property;
};

const determinarTipoPropiedad = (json, idioma) => {
  const textoJson = JSON.stringify(json).toLowerCase();

  const esVivienda = PALABRAS_CLAVE.vivienda[idioma].some((palabra) =>
    textoJson.includes(palabra)
  );
  const esGaraje = PALABRAS_CLAVE.garaje[idioma].some((palabra) =>
    textoJson.includes(palabra)
  );

  if (esVivienda) {
    return 'vivienda';
  } else if (esGaraje) {
    return 'garaje';
  } else {
    return 'otros';
  }
};

export default { validateIdealistaURL, createInmueble };
