import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthValidationResponse,
} from '../types/api';
import { apiClient } from './api-client';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/login', credentials, false);
    const loginResponse = response as LoginResponse;
    
    // Store token in localStorage
    if (loginResponse.data?.token) {
      localStorage.setItem('auth_token', loginResponse.data.token);
    }
    
    return loginResponse;
  },

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/register', userData, false);
    return response as LoginResponse;
  },

  async validateToken(): Promise<AuthValidationResponse> {
    const response = await apiClient.get('/auth/valid', true);
    return response as AuthValidationResponse;
  },

  async requestPasswordReset(email: string): Promise<{ data: { success: boolean } }> {
    const payload: ForgotPasswordRequest = { email };
    const response = await apiClient.post('/auth/forgot-password', payload, false);
    return response as { data: { success: boolean } };
  },

  async resetPassword(token: string, newPassword: ResetPasswordRequest): Promise<{ data: { success: boolean } }> {
    const response = await apiClient.patch(`/auth/forgot-password/${token}`, newPassword, false);
    return response as { data: { success: boolean } };
  },

  logout(): void {
    localStorage.removeItem('auth_token');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
