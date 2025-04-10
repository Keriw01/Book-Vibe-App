import axiosInstance, { setAxiosCsrfToken } from './axiosConfig';
import { LoginResponse } from '../responses/LoginResponse';
import { UserDto } from '../dtos/UserDto';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
}

interface CsrfTokenResponse {
  csrfToken: string;
  headerName: string;
}

export const authService = {
  async initializeCsrf(): Promise<void> {
    try {
      const response = await axiosInstance.get<CsrfTokenResponse>('/auth/csrf-token');
      const token = response.data.csrfToken;

      setAxiosCsrfToken(token);

      console.log('CSRF token initialized/refreshed.');
    } catch (error) {
      console.error('CSRF initialization error:', error);
      setAxiosCsrfToken(null);
    }
  },

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // await this.initializeCsrf();
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);

    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<LoginResponse> {
    // await this.initializeCsrf();
    const response = await axiosInstance.post<LoginResponse>('/auth/register', credentials);

    return response.data;
  },

  async logout(): Promise<void> {
    // await this.initializeCsrf();
    await axiosInstance.post('/auth/logout');

    console.log('Logout request sent.');
  },

  async getCurrentUser(): Promise<UserDto> {
    const response = await axiosInstance.get<UserDto>('/user/me');

    return response.data;
  },
};