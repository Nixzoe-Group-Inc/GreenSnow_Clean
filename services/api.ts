import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.43.55:8000/api/', 
  timeout: 30000,
});

export default api;
