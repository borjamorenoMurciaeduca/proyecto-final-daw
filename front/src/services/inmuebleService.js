import axios from 'axios';
import inputValidatorService from './inputValidatorService';
import { API_URL } from '../commons/config/config';
const baseInmuebleUrl = `${API_URL}/inmueble`;
const basePrepareInmuebleUrl = `${API_URL}/prepare-inmueble/`;

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addInmueble = async (inmueble) => {
  const config = {
    headers: { Authorization: token },
  };

  let data = JSON.stringify(inmueble);
  let res = await axios.post(baseInmuebleUrl, data, config);

  return res;
};

const prepareInmuebleForm = async (idInmueble) => {
  const config = {
    headers: { Authorization: token },
  };

  let res = await axios.get(basePrepareInmuebleUrl + idInmueble, config);

  let data = inputValidatorService.createInmueble(res, idInmueble);

  return data;
};

export default { addInmueble, prepareInmuebleForm, setToken };
