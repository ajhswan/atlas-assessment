import { SignupForm } from "../features/signup";
import type { Route } from "../+types/routes/auth.register";
import { redirect } from "react-router";
import { registerUser } from "../api.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const title = formData.get("title") as string;

  try {
    await registerUser({
      email,
      password,
      firstName,
      lastName,
      title: title || undefined,
    });
    
    // Redirect to login after successful registration
    return redirect("/auth/login?registered=true");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred during registration",
    };
  }
}

export default function Register() {
  return <SignupForm />;
}
