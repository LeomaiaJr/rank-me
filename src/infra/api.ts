import axios from 'axios';
import { getAuthToken } from '../util/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem('rankme-auth');
      document.location.href = '/start-react-free/auth/login';
    }

    return Promise.reject(error);
  }
);

export { api };
