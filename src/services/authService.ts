import api from './api';
    import { Role, User } from '@/types';

    interface LoginCredentials {
      email: string;
      password: string;
      role: Role;
    }

    interface LoginResponse {
      token: string;
      user: User;
    }

    interface RegisterData {
      name: string;
      email: string;
      password: string;
      role: Role;
      rfidNumber?: string; // Optional for members
      membershipHours?: number; // Optional for members
      position?: string; // Optional for admins
    }

    export const authService = {
      login: async (credentials: LoginCredentials): Promise<LoginResponse | null> => {
        try {
          const response = await api.post('/auth/login', credentials);
          localStorage.setItem('authToken', response.data.token);
          return response.data;
        } catch (error) {
          console.error("Login error:", error);
          throw error; // Re-throw to be handled by caller
        }
      },

      register: async (userData: RegisterData): Promise<User | null> => {
        try {
          const endpoint = userData.role === 'admin' ? '/users/admins' : '/users/members';
          const response = await api.post(endpoint, userData);
          return response.data.member || response.data.admin; // Adjust based on backend response
        } catch (error) {
          console.error("Registration error:", error);
          throw error; // Re-throw to be handled by caller
        }
      },

      getCurrentUser: async (): Promise<User | null> => {
        try {
          const response = await api.get('/auth/me');
          return response.data;
        } catch (error) {
          console.error("getCurrentUser error:", error);
          return null; // No need to throw, just return null
        }
      },

      logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('auth');
      },

      updateProfile: async (profileData: any): Promise<User | null> => {
        try {
          const response = await api.put('/users/profile', profileData);
          return response.data;
        } catch (error) {
          console.error("Profile update error:", error);
          throw error; // Re-throw to be handled by caller
        }
      },

      changePassword: async (passwordData: { currentPassword: string, newPassword: string }): Promise<boolean> => {
        try {
          await api.put('/auth/password', passwordData);
          return true;
        } catch (error) {
          console.error("Password change error:", error);
          throw error; // Re-throw to be handled by caller
        }
      }
    };

    export default authService;
