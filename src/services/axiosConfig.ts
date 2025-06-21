import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const method = config.method?.toLowerCase();
    if (method === 'post' || method === 'put' || method === 'delete' || method === 'patch') {
      const currentCsrfToken = Cookies.get('XSRF-TOKEN');

      if (currentCsrfToken) {
        config.headers['X-XSRF-TOKEN'] = currentCsrfToken;
        console.log('X-XSRF-TOKEN header set from variable:', currentCsrfToken);
      } else {
        console.warn('CSRF token variable is null. CSRF header not set. Ensure initializeCsrf was called and succeeded.');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;