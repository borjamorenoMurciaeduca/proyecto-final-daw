import { CONVERT_EURO_LIBRA } from '@/commons/config/config.js';
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
    const dateArr = date.split('/');
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  } else {
    return '';
  }
}

function DateToUrl(date) {
  if (date !== '') {
    const fecha = new Date(date);

    const año = fecha.getFullYear().toString();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const día = fecha.getDate().toString().padStart(2, '0');

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

function FormatNumberToDB(value, lang) {
  let result = 0;
  if (lang === 'en') {
    result = value.replace(/,/g, '');
  } else {
    result = value.replace(/\./g, '');
    result = result.replace(/,/g, '.');
  }

  return result;
}

function FormatPriceLang(value, lang) {
  let result = value;
  if (lang === 'en') {
    result = value / CONVERT_EURO_LIBRA;
  }
  return result;
}

function FormatNumber(value, lang) {
  if (lang === 'en') {
    return parseFloat(value).toLocaleString('en-GB', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (lang === 'es') {
    return parseFloat(value).toLocaleString('de-DE', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value;
}

function FormatPrice(value, lang, includeCurrency = true) {
  const precioNumero = Number(value);
  if (isNaN(precioNumero)) {
    return '';
  }

  const options = { style: 'decimal', minimumFractionDigits: 2 };

  if (includeCurrency) {
    options.style = 'currency';
    options.currency = lang === 'en' ? 'GBP' : 'EUR';

    if (options.currency === 'GBP') {
      const precioLibra = precioNumero * CONVERT_EURO_LIBRA;
      return Intl.NumberFormat('en-GB', options).format(precioLibra);
    } else {
      return Intl.NumberFormat('de-DE', options).format(precioNumero);
    }
  }

  if (lang === 'en') {
    const precioLibra = precioNumero * CONVERT_EURO_LIBRA;
    return Intl.NumberFormat('en-GB', options).format(precioLibra);
  } else {
    return Intl.NumberFormat('de-DE', options).format(precioNumero);
  }
}

function formatDate(value, lang, showHours = true) {
  const date = new Date(value);
  const withHoursOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  const optionsWithoutHours = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
  };

  const optionSelected = showHours ? withHoursOptions : optionsWithoutHours;

  return new Intl.DateTimeFormat(lang, optionSelected).format(date);
}

function getFullURL(value) {
  if (window.location.port == '')
    return `${window.location.protocol}//${window.location.hostname}/shared/${value}`;
  else
    return `${window.location.protocol}//${window.location.hostname}:${window.location.port}/shared/${value}`;
}

function getCurrency(lang) {
  return lang === 'en' ? '£' : '€';
}

export default {
  FixPrice,
  FormatNumber,
  FormatPrice,
  FormatNumberToDB,
  FormatPriceLang,
  formatDate,
  CleanId,
  DateReceived,
  DateTimeReceived,
  DateToInsert,
  DateToTimeReceived,
  DateToUrl,
  AddSpaces,
  getFullURL,
  getCurrency,
};
