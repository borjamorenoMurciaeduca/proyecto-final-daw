const APP_NAME = "IdealistaWatch"
const API_URL = 'http://127.0.0.1:8000/api';
const DEBUG_MODE = false;
const DEFAULT_LANGUAGES = ['es', 'en'];
const INIT_LANGUAGE = 'es';
const PALABRAS_CLAVE = {
  vivienda: {
    es: ["piso", "casa", "vivienda", "habitación", "baño", "cocina", "salón", "terraza", "ascensor"],
    en: ["apartment", "house", "home", "room", "bathroom", "kitchen", "living room", "terrace", "elevator"]
  },
  garaje: {
    es: ["garaje", "plaza de garaje", "cochera", "plaza para coche", "automática", "entrada / salida"],
    en: ["garage", "parking space", "carport", "car space", "automatic", "entrance / exit"]
  }
};

export { APP_NAME, API_URL, DEBUG_MODE, DEFAULT_LANGUAGES, INIT_LANGUAGE, PALABRAS_CLAVE };
