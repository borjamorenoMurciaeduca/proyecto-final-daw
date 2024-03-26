import axios from 'axios';
// const baseUrl = '/api/login';

const baseUrl = 'http://127.0.0.1:8000/api/';

const login = async (credentials) => {
  const { data } = await axios.post(baseUrl + 'login', credentials);
  return data;
};
const logout = async () => {
  const { token } = JSON.parse(window.localStorage.getItem('user'));
  window.localStorage.removeItem('user');
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(baseUrl + 'logout', null, header);
  return data;
};

export default { login, logout };
