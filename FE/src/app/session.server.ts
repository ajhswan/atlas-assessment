import { createCookieSessionStorage, redirect } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create cookie-based session storage
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "s3cr3t-change-in-production"],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
  },
});

// Type for user stored in session
interface SessionUser {
  userId?: string;
  organizationId?: string;
  type?: string;
  is_archived?: boolean;
}

/**
 * Get the session from request
 */
export async function getUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return session;
}

/**
 * Create a new user session and redirect
 */
export async function createUserSession(
  token: string,
  user: SessionUser,
  redirectTo: string
) {
  const session = await sessionStorage.getSession();
  session.set("token", token);
  session.set("user", user);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

/**
 * Require authentication - throws redirect if not authenticated
 */
export async function requireAuth(request: Request) {
  const session = await getUserSession(request);
  const token = session.get("token");
  const user = session.get("user");

  if (!token) {
    throw redirect("/auth/login");
  }

  // Optionally validate token with BE
  try {
    const response = await fetch(`${API_URL}/auth/valid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw redirect("/auth/login");
    }

    return { token, user };
  } catch (error) {
    throw redirect("/auth/login");
  }
}

/**
 * Get user from session (doesn't require auth, returns null if not logged in)
 */
export async function getUser(request: Request): Promise<SessionUser | null> {
  const session = await getUserSession(request);
  return session.get("user") || null;
}

/**
 * Logout user and destroy session
 */
export async function logout(request: Request) {
  const session = await getUserSession(request);

  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
