import axios from 'axios';
import inputValidatorService from './inputValidatorService';
const baseURL = import.meta.env.VITE_API_URL;

const baseInmuebleUrl = baseURL + 'inmueble';
const basePrepareInmuebleUrl = baseURL + 'prepare-inmueble/';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addInmueble = async ({ inmuebleToAdd }) => {
  const config = {
    headers: { Authorization: token },
  };

  let res = await axios.post(baseInmuebleUrl, inmuebleToAdd, config);
  return res;
};

const prepareInmuebleForm = async (idInmueble) => {
  const config = {
    headers: { Authorization: token },
  };

  let res = await axios.get(basePrepareInmuebleUrl + idInmueble, config);

  let data = inputValidatorService.createInmueble(res);

  if (data) {
    return data;
  }
  return null;
};

export default { addInmueble, prepareInmuebleForm, setToken };
