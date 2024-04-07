import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/inmueble';
const prepareInmuebleUrl = 'http://127.0.0.1:8000/api/prepare-inmueble/';
// const baseUrl = '/api/inmueble';
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addInmueble = async (inmueble) => {
  const config = {
    headers: { Authorization: token },
  };

  let data = JSON.stringify(inmueble);
  let res = await axios.post(baseUrl, data, config);

  return res;
};

const prepareInmuebleForm = async (idInmueble) => {
  const config = {
    headers: { Authorization: token },
  };

  let res = await axios.get(prepareInmuebleUrl + idInmueble, config);

  return res;
};

export default { addInmueble, prepareInmuebleForm, setToken };
