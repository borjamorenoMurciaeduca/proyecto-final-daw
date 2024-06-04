import axiosInterceptor from '@/utils/httpInterceptor';
const baseURL = import.meta.env.VITE_API_URL;

const getAllTypeProperties = async () => {
  let { data } = await axiosInterceptor.get(baseURL + 'type-properties');
  return data;
};


export default {
  getAllTypeProperties,
};
