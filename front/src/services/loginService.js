import axiosInterceptor from '@/utils/httpInterceptor';
const baseURL = import.meta.env.VITE_API_URL;

const login = async (credentials) => {
  const { data } = await axiosInterceptor.post(`${baseURL}login`, credentials);
  return data;
};

const user = async () => {
  const { data } = await axiosInterceptor.get(`${baseURL}user`);
  return data;
};

const register = async (credentials) => {
  const { data } = await axiosInterceptor.post(
    `${baseURL}register`,
    credentials
  );
  return data;
};

const logout = async () => {
  const { data } = await axiosInterceptor.post(`${baseURL}logout`, null);
  return data;
};

export default { login, logout, user, register };
