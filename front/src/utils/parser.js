import { CheckStringAlphanumeric } from './strings';

function CleanId(id) {
  try {
    return id.trim();
  } catch (e) {
    return id;
  }
}

function DateReceived(date) {
  if (date !== '') {
    const indice = date.includes('T') ? date.indexOf('T') : date.indexOf(' ');
    const strSplit = date.substr(0, indice);
    const resultArr = strSplit.split('-');
    return `${resultArr[2]}/${resultArr[1]}/${resultArr[0]}`;
  } else {
    return '';
  }
}

function DateToTimeReceived(date) {
  if (date !== '') {
    const d = new Date(date);
    return `${d.getHours()}:${d.getMinutes()}`;
  } else {
    return '';
  }
}

function DateTimeReceived(date) {
  if (date !== '') {
    const indice = date.includes('T') ? date.indexOf('T') : date.indexOf(' ');
    const strSplit = date.substr(0, indice);

    const timeIndice = date.includes('.')
      ? date.indexOf('T')
      : date.indexOf(' ');
    const timeSplit = date.substr(indice + 1, timeIndice - 2);

    const resultArr = strSplit.split('-');
    return `${resultArr[2]}/${resultArr[1]}/${resultArr[0]} ${timeSplit}`;
  } else {
    return '';
  }
}

function DateToInsert(date) {
  if (date !== '') {
    const dateArr = date.split('-');
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  } else {
    return '';
  }
}

function DateToUrl(date) {
  if (date !== '') {
    // Crear un objeto Date a partir de la cadena
    const fecha = new Date(date);

    // Obtener los componentes de la fecha
    const año = fecha.getFullYear().toString();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const día = fecha.getDate().toString().padStart(2, '0');

    // Formatear la cadena en el formato deseado para la URL
    const formatoUrl = `${año}${mes}${día}`;

    return formatoUrl;
  } else {
    return '';
  }
}

function AddSpaces(value, spaces) {
  value = value.toString();
  value = CleanId(value);
  if (CheckStringAlphanumeric(value)) return value;

  const total = spaces - value.length;
  return ' '.repeat(total) + value;
}

function FixPrice(value) {
  let valueParser = Number(value);
  let partes = valueParser.toFixed(2).split('.');
  let parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  let resultado = parteEntera + ',' + partes[1];
  return resultado;
}

export default {
  FixPrice,
  CleanId,
  DateReceived,
  DateTimeReceived,
  DateToInsert,
  DateToTimeReceived,
  DateToUrl,
  AddSpaces,
};
