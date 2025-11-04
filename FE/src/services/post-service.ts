import type {
  Post,
  PostResponse,
  GetPostsResponse,
  CreatePostRequest,
  UpdatePostRequest,
  GetPostsParams,
} from '../types/api';
import { apiClient } from './api-client';

export const postService = {
  async getPosts(params?: GetPostsParams): Promise<GetPostsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.search) {
      queryParams.append('search', params.search);
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/posts?${queryString}` : '/posts';
    
    const response = await apiClient.get(endpoint, true);
    return response as GetPostsResponse;
  },

  async getPost(postId: string): Promise<PostResponse> {
    const response = await apiClient.get(`/posts/${postId}`, true);
    return response as PostResponse;
  },

  async createPost(postData: CreatePostRequest): Promise<PostResponse> {
    const response = await apiClient.post('/posts', postData, true);
    return response as PostResponse;
  },

  async updatePost(postId: string, postData: UpdatePostRequest): Promise<PostResponse> {
    const response = await apiClient.put(`/posts/${postId}`, postData, true);
    return response as PostResponse;
  },

  async deletePost(postId: string): Promise<{ data: { success: boolean } }> {
    const response = await apiClient.delete(`/posts/${postId}`, true);
    return response as { data: { success: boolean } };
  },
};
