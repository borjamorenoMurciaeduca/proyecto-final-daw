import axiosInterceptor from '@/utils/httpInterceptor';
const baseURL = import.meta.env.VITE_API_URL;

const addProperty = async (inmuebleToAdd) => {
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
  let { data } = await axiosInterceptor.get(
    `${baseURL}prepare-inmueble/${idInmueble}`
  );

  return data;
};

const getPropertyPrices = async (propertyId) => {
  let { data } = await axiosInterceptor.get(
    `${baseURL}property/${propertyId}/prices`
  );
  return data;
};

const updateProperty = async (property) => {
  let { data } = await axiosInterceptor.put(
    `${baseURL}property/${property.property_id}`,
    property
  );
  return data;
};

const shareProperty = async (propertyId) => {
  let { data } = await axiosInterceptor.post(
    `${baseURL}property/${propertyId}/share`
  );
  return data;
};

const getShareProperty = async (shareUrl) => {
  let { data } = await axiosInterceptor.get(
    `${baseURL}shared-property/${shareUrl}`
  );
  return data;
};

const changeFavoriteProperty = async (propertyId) => {
  let { data } = await axiosInterceptor.post(
    `${baseURL}property/${propertyId}/favorite`
  );
  return data;
};

const deleteMultipleProperties = async (propertiesIds) => {
  let { data } = await axiosInterceptor.delete(
    `${baseURL}properties/delete-multiple`,
    {
      data: { ids: propertiesIds },
    }
  );
  return data;
};

const revokeShareProperty = async (propertyId) => {
  const { data } = await axiosInterceptor.put(
    `${baseURL}property/${propertyId}/revoke-share`
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
  deleteMultipleProperties,
  revokeShareProperty,
  updateProperty,
};
