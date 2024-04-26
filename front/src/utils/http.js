import axios from 'axios';
import { USER_LOCAL_TOKEN } from '../strings/defaults';
const LogServiceWorker = new Worker('/workers/LoggerWorker.js');

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // const token = Cookie.get(USER_COOKIE_TOKEN);
    const token = window.localStorage.getItem(USER_LOCAL_TOKEN);

    if (token !== null && token !== undefined)
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleAPIError = (error) => {
  if (error.response?.status === 401) {
    window.location.reload();
  }

  const defaultError = {
    error: error.code || 'Error inesperado.',
    message:
      error.response?.statusText ||
      (error.code
        ? `El servidor ha enviado el código de error ${error.code}`
        : 'Ha sucedido un error inesperado en el servidor.'),
    statusCode: error.response?.status || 500,
  };

  if (error.response?.data) {
    return {
      ...defaultError,
      ...error.response.data,
    };
  }

  return defaultError;
};

// Interceptor de logs
instance.interceptors.response.use(
  (response) => {
    if (import.meta.env.PROD) {
      LogServiceWorker.postMessage({
        url: response.config.url || '',
        method: response.config.method || '',
        message: '',
        statusCode: response.status || '',
        type: 'success',
        APP_LOGS_URL: import.meta.env.VITE_APP_LOGS_URL,
        requestBody: response.config.data
          ? JSON.stringify(response.config.data)
          : '',
        json:
          (
            (encodeURI(JSON.stringify(response.data)).split(/%..|./).length -
              1) /
            1024
          ).toFixed(2) + 'kb',
      });
    }
    return response;
  },
  async (error) => {
    if (import.meta.env.PROD) {
      LogServiceWorker.postMessage({
        url: error.response?.config.url ?? '',
        method: error.response?.config.method ?? '',
        message:
          `${error.name}/[${error.code}]-${error.message}-${error.response?.statusText}-${error.response?.data?.message}` ||
          '',
        statusCode: error.response?.status,
        type: 'error',
        APP_LOGS_URL: import.meta.env.VITE_APP_LOGS_URL,
        requestBody: error.config?.data
          ? JSON.stringify(error.config.data)
          : '',
        json:
          (
            (encodeURI(JSON.stringify(error.response?.data)).split(/%..|./)
              .length -
              1) /
            1024
          ).toFixed(2) + 'kb' || '',
      });
    }
    return await Promise.reject(handleAPIError(error));
  }
);

export default instance;
