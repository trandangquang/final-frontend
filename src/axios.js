import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://carstore-api.onrender.com',
});

export default instance;
