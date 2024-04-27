import axiosInterceptor from '@/utils/httpInterceptor';
import inputValidatorInmueble from '@/utils/inputValidatorInmueble';
const baseURL = import.meta.env.VITE_API_URL;

const addInmueble = async ({ inmuebleToAdd }) => {
  let res = await axiosInterceptor.post(baseURL + 'inmueble', inmuebleToAdd);
  return res;
};

const prepareInmuebleForm = async (idInmueble) => {
  // let res = await axios.get(basePrepareInmuebleUrl + idInmueble, config);
  let res = await axiosInterceptor.get(
    `${baseURL}prepare-inmueble/${idInmueble}`
  );
  let data = inputValidatorInmueble.createInmueble(res);

  if (data) {
    return data;
  }
  return null;
};

export default { addInmueble, prepareInmuebleForm };
