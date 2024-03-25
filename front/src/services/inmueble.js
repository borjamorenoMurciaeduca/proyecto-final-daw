import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/inmueble';
// const baseUrl = '/api/inmueble';
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const addInmueble = async (inmueble) => {
  // let headersList = {
  //   Authorization: token,
  // };
  // let response = await axios.get(userUrl, { headers: headersList });
  // console.log(response.data);

  let headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };

  let data = JSON.stringify(inmueble);
  let res = await axios.post(baseUrl, data, headers);
  console.log(res.data);
  return res;
};

export default { addInmueble, setToken };
