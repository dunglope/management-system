import axios from 'axios';

  const api = axios.create({
      baseURL: 'http://localhost:5000/api',
  });

  api.interceptors.request.use(
      (config) => {
          const token = localStorage.getItem('token');
          if (token) {
              config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
      },
      (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
      (response) => response,
      (error) => {
          if (error.response) {
              if (error.response.status === 401) {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                  return Promise.reject(new Error(error.response.data.error || 'Unauthorized'));
              }
              // Return the server's error message for better debugging
              return Promise.reject(new Error(error.response.data.error || error.response.data.message || 'Server error'));
          }
          return Promise.reject(error);
      }
  );

  export const registerUser = (userData) => api.post('/users/register', userData);
  export const loginUser = (credentials) => api.post('/users/login', credentials);
  export const getCourses = () => api.get('/courses');

  export default api;