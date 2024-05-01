import axiosInterceptor from '@/utils/httpInterceptor';
import inputValidatorInmueble from '@/utils/inputValidatorInmueble';
const baseURL = import.meta.env.VITE_API_URL;

const addProperty = async ({ inmuebleToAdd }) => {
  let res = await axiosInterceptor.post(baseURL + 'properties', inmuebleToAdd);
  return res;
};

const getAllUserProperties = async () => {
  let { data } = await axiosInterceptor.get(baseURL + 'properties');
  return data;
};

const prepareInmuebleForm = async (idInmueble) => {
  // let res = await axios.get(basePrepareInmuebleUrl + idInmueble, config);
  let res = await axiosInterceptor.get(
    `${baseURL}prepare-inmueble/${idInmueble}`
  );
  console.log(' res', res);
  let data = inputValidatorInmueble.createInmueble(res);

  if (data) {
    return data;
  }
  return null;
};

export default {
  addInmueble: addProperty,
  prepareInmuebleForm,
  getAllUserProperties,
};
