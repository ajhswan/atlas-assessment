const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(
    endpoint: string,
    options: RequestInit,
    requiresAuth: boolean
  ): Promise<any> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (requiresAuth) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get(endpoint: string, requiresAuth: boolean = false): Promise<any> {
    return this.request(endpoint, { method: 'GET' }, requiresAuth);
  }

  async post(
    endpoint: string,
    data: any,
    requiresAuth: boolean = false
  ): Promise<any> {
    return this.request(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      requiresAuth
    );
  }

  async put(
    endpoint: string,
    data: any,
    requiresAuth: boolean = false
  ): Promise<any> {
    return this.request(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      requiresAuth
    );
  }

  async patch(
    endpoint: string,
    data: any,
    requiresAuth: boolean = false
  ): Promise<any> {
    return this.request(
      endpoint,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      },
      requiresAuth
    );
  }

  async delete(endpoint: string, requiresAuth: boolean = false): Promise<any> {
    return this.request(endpoint, { method: 'DELETE' }, requiresAuth);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
