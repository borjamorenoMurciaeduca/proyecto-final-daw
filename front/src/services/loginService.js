import axios from 'axios';
import axiosInterceptor from '../utils/httpInterceptor';
const baseURL = import.meta.env.VITE_API_URL;

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const login = async (credentials) => {
  const { data } = await axios.post(baseURL + 'login', credentials);
  return data;
};

const user = async () => {
  const { data } = await axiosInterceptor.get(baseURL + 'user');
  return data;
};

const register = async (credentials) => {
  const { data } = await axios.post(baseURL + 'register', credentials);
  return data;
};

const logout = async () => {
  const config = {
    headers: { Authorization: token },
  };
  localStorage.removeItem('user');
  const { data } = await axios.post(baseURL + 'logout', null, config);
  return data;
};

export default { login, logout, user, register, setToken };
