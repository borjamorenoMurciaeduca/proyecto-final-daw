import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json'; 

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: translationEN },
      es: { translation: translationES }, 
    },
    lng: 'es', 
    fallbackLng: 'es', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
