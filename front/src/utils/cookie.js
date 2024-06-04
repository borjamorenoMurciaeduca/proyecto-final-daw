// By default never expires
// tokenname, valortoken, 3600
const set = (name, value, timeInSeconds) => {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getTime() + timeInSeconds * 1000);
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

// Obtener el valor de una cookie
const get = (name) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return null;
};

// Eliminar una cookie
const del = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const clear = () => {
  document.cookie.split(';').forEach((cookie) => {
    document.cookie =
      cookie.split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  });
};

export default {
  set,
  get,
  del,
  clear,
};
