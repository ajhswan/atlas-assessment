const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
    user: {
      userId?: string;
      organizationId?: string;
      type?: string;
      is_archived?: boolean;
    };
    expiresIn: number;
  };
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title?: string;
}

interface ApiError {
  message: string;
}

/**
 * Login user via BE API
 */
export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Login failed" }));
    throw new Error(error.message || "Invalid credentials");
  }

  return response.json();
}

/**
 * Register new user via BE API
 */
export async function registerUser(data: RegisterData): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Registration failed" }));
    console.error('Registration error:', error);
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<{ data: { success: boolean } }> {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Password reset request failed");
  }

  return response.json();
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, password: string): Promise<{ data: { success: boolean } }> {
  const response = await fetch(`${API_URL}/auth/forgot-password/${token}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Reset failed" }));
    throw new Error(error.message || "Password reset failed");
  }

  return response.json();
}

/**
 * Validate token with BE
 */
export async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/valid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get user data from BE API
 */
export async function getUserData(token: string) {
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch user data" }));
    throw new Error(error.message || "Failed to fetch user data");
  }

  return response.json();
}

/**
 * Get posts from BE API
 */
export async function getPosts(token: string) {
  const response = await fetch(`${API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch posts" }));
    throw new Error(error.message || "Failed to fetch posts");
  }

  return response.json();
}

/**
 * Get single post by ID from BE API
 */
export async function getPostById(token: string, postId: string) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch post" }));
    throw new Error(error.message || "Failed to fetch post");
  }

  return response.json();
}

/**
 * Delete a post via BE API
 */
export async function deletePost(token: string, postId: string) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to delete post" }));
    console.error('BE Error:', response.status, error);
    throw new Error(error.message || `Failed to delete post (${response.status})`);
  }

  return response.json();
}

/**
 * Create a new post via BE API
 */
export async function createPost(token: string, data: { title: string; content: string }) {
    console.log(token, data);
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to create post" }));
    console.error('BE Error:', response.status, error);
    throw new Error(error.message || `Failed to create post (${response.status})`);
  }

  return response.json();
}
