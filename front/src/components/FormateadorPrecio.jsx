import React from 'react';
import { useTranslation } from 'react-i18next';

const FormateadorPrecio = ({ precio }) => {

  const { i18n } = useTranslation();
  const formatearPrecio = (precio) => {
    const precioNumero = Number(precio);
    const factorConversionEuroLibra = 0.85;

    let symbol;
    if (i18n.language === 'es') {
      symbol = 'EUR';
    } else if (i18n.language === 'en') {
      symbol = 'GBP';
    } else {
      symbol = 'EUR';
    }
    let precioFormateado;
    if (symbol === 'EUR') {
      precioFormateado = precioNumero.toLocaleString(i18n.language, {
        style: 'currency',
        currency: symbol,
        minimumFractionDigits: 2
      });
    } else {
      const precioLibra = precioNumero * factorConversionEuroLibra;
      precioFormateado = precioLibra.toLocaleString(i18n.language, {
        style: 'currency',
        currency: symbol,
        minimumFractionDigits: 2
      });
    }
    
    return precioFormateado;
  };

  return (
    <span>{formatearPrecio(precio)}</span>
  );
};

export default FormateadorPrecio;
