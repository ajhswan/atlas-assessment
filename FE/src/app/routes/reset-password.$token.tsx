import { useParams } from "react-router";
import { ResetPasswordForm } from "../features/reset-password";

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
