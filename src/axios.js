import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4021',
}); 

export default instance;