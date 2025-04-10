import axios from 'axios';

let currentCsrfToken: string | null = null;

export const setAxiosCsrfToken = (token: string | null) => {
  console.log(`Setting CSRF token in axiosConfig to: ${token}`);
  currentCsrfToken = token;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const method = config.method?.toLowerCase();
    if (method === 'post' || method === 'put' || method === 'delete' || method === 'patch') {
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