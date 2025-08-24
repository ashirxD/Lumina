import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // Important for cookies/session
});

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: 'gurardian' | 'child' | 'admin';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'gurardian' | 'child' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
}

export const authApi = {
  signup: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  signin: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signin', credentials);
    return response.data;
  },

  signout: async (): Promise<void> => {
    await api.post('/auth/signout');
  },

  me: async (): Promise<AuthResponse> => {
    const response = await api.get<AuthResponse>('/auth/me');
    return response.data;
  }
};

export default api;
