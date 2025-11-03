// User types
export interface User {
  id?: string;
  email?: string;
  title?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  is_super_admin?: boolean;
  organization_id?: string;
  is_archived?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserResponse {
  data?: User;
  count?: number;
}

export interface GetUsersResponse {
  data?: User[];
  count?: number;
}

// Post types
export interface Post {
  id?: string;
  title?: string;
  content?: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface PostResponse {
  data?: Post;
  count?: number;
}

export interface GetPostsResponse {
  data?: Post[];
  count?: number;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
  keepMeSignedIn?: boolean;
}

export interface LoginData {
  token: string;
  user: {
    userId?: string;
    organizationId?: string;
    type?: string;
    is_archived?: boolean;
  };
  expiresIn: number;
}

export interface LoginResponse {
  data?: LoginData;
  count?: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
}

export interface AuthValidationResponse {
  success: boolean;
  userType: 'super_admin' | 'user';
}

// Request types
export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
}

export interface UpdateUserRequest {
  email?: string;
  title?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}
