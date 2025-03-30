import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  id: number;
  email: string;
  fullName: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {

          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Authentication error', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null); 
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setUser(null); 
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userData = await authService.login({ email, password });
      setUser({
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email
      });
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      console.error('Login error', error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    try {
      await authService.register({ email, password, fullName });
      return await login(email, password);
    } catch (error) {
      console.error('Register error', error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout
  };
};