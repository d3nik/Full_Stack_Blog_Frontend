import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4021',
}); 

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  // const token = window.localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

export default instance;