import axios from 'axios';
import { API_URL } from '../commons/config/config';
import inputValidatorService from './inputValidatorService';
const baseInmuebleUrl = `${API_URL}/inmueble`;
const basePrepareInmuebleUrl = `${API_URL}/prepare-inmueble/`;

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

  let data = inputValidatorService.createInmueble(res, idInmueble);

  //console.log("data inmueble: ", data);

  return data;
};

export default { addInmueble, prepareInmuebleForm, setToken };
