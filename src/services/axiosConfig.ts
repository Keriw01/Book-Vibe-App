import axios from 'axios';

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true 
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
      const csrfToken = getCookie('XSRF-TOKEN');
      console.log(csrfToken);
      if (csrfToken) {
        console.log(csrfToken);
        config.headers['X-XSRF-TOKEN'] = csrfToken;
        console.log(config.headers);
      }
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;