import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const login = async (credentials) => {
  const { data } = await axios.post(baseUrl + 'login', credentials);
  return data;
};

const user = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.get(baseUrl + 'user', config);
  return data;
};

const register = async (credentials) => {
  const { data } = await axios.post(baseUrl + 'register', credentials);
  return data;
};

const logout = async () => {
  const config = {
    headers: { Authorization: token },
  };
  localStorage.removeItem('user');
  const { data } = await axios.post(baseUrl + 'logout', null, config);
  return data;
};

export default { login, logout, user, register, setToken };
