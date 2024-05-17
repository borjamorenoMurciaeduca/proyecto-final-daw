import axiosInterceptor from '@/utils/httpInterceptor';
import inputValidatorInmueble from '@/utils/inputValidatorInmueble';
const baseURL = import.meta.env.VITE_API_URL;

const addProperty = async ({ inmuebleToAdd }) => {
  let { data } = await axiosInterceptor.post(
    baseURL + 'properties',
    inmuebleToAdd
  );
  return data;
};

const getAllUserProperties = async () => {
  let { data } = await axiosInterceptor.get(baseURL + 'properties');
  return data;
};

const prepareInmuebleForm = async (idInmueble) => {
  let res = await axiosInterceptor.get(
    `${baseURL}prepare-inmueble/${idInmueble}`
  );

  let data = inputValidatorInmueble.createInmueble(res);

  console.log("prepareInmuebleForm data: ", data);

  if (data) {
    return data;
  }
  return null;
};

const getPropertyPrices = async (property_id) => {
  let { data } = await axiosInterceptor.get(
    `${baseURL}property/${property_id}/prices`
  );
  return data;
};

const shareProperty = async (property_id) => {
  let { data } = await axiosInterceptor.post(
    `${baseURL}property/${property_id}/share`
  );
  return data;
};

const getShareProperty = async (share_url) => {
  let { data } = await axiosInterceptor.get(
    `${baseURL}shared-property/${share_url}`
  );
  return data;
};

const changeFavoriteProperty = async (property_id) => {
  let { data } = await axiosInterceptor.post(
    `${baseURL}property/${property_id}/favorite`
  );
  return data;
};

export default {
  addProperty,
  prepareInmuebleForm,
  getAllUserProperties,
  getPropertyPrices,
  shareProperty,
  getShareProperty,
  changeFavoriteProperty,
};
