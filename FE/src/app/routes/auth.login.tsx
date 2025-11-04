import { LoginForm } from "../features/login";
import type { Route } from "../+types/routes/auth.login";
import { createUserSession } from "../session.server";
import { loginUser } from "../api.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const data = await loginUser({ email, password });
    return createUserSession(data.data.token, data.data.user, "/");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred during login",
    };
  }
}

export default function Login() {
  return <LoginForm />;
}
