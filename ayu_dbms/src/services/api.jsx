import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this is the correct backend URL
  headers: {
    'Content-Type': 'application/json', // Set default headers if needed
  },
});

export default api;
