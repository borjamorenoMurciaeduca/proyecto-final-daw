import axios from 'axios';
import { API_URL } from '../commons/config/config';
const baseUrl = `${API_URL}/`;

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

const logout = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.post(baseUrl + 'logout', null, config);
  return data;
};

export default { login, logout, user, setToken };
