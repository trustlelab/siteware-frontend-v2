import axios from 'axios';

// Create an instance of axios with predefined config
const API = axios.create({
  baseURL: 'http://localhost:8000'
});

export default API;
