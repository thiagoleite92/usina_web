import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.setAuthorization(
    'Bearer ' + JSON.parse(localStorage.getItem('token')!)
  );

  return config;
});
