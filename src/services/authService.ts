import axiosInstance from './axiosConfig';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  fullName: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      const userData = await axiosInstance.get('/user/me');
      return {
        id: userData.data.id,
        email: userData.data.email,
        fullName: userData.data.fullName
      };
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  },

  register: async (credentials: RegisterCredentials) => {
    try {
      const response = await axiosInstance.post('/auth/register', credentials);
      return response.data;
    } catch (error) {
      console.error('Registration error', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/user/me');

      const userData = {
        id: response.data.id,
        fullName: response.data.fullName,
        email: response.data.email
      };
      
      return userData;
    } catch (error) {
      console.error('Fetch user error', error);
      throw error;
    }
  }
};