import { useParams, redirect } from "react-router";
import { ResetPasswordForm } from "../features/reset-password";
import type { Route } from "../+types/routes/reset-password.$token";
import { resetPassword } from "../api.server";

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const token = params.token;

  if (!token) {
    return { error: "Invalid reset token" };
  }

  try {
    await resetPassword(token, password);
    return redirect("/auth/login?reset=success");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred resetting password",
    };
  }
}

export default function ResetPassword() {
  const { token } = useParams();

  if (!token) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Invalid Reset Link</h2>
          <p className="text-gray-600">This password reset link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-8">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
