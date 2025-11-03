import {
  User,
  UserResponse,
  UpdateUserRequest,
} from '../types/api';
import { apiClient } from './api-client';

export const userService = {
  async getProfile(): Promise<UserResponse> {
    const response = await apiClient.get('/user', true);
    return response as UserResponse;
  },

  async updateProfile(userId: string, userData: UpdateUserRequest): Promise<UserResponse> {
    const response = await apiClient.put(`/user/${userId}`, userData, true);
    return response as UserResponse;
  },
};
