import { useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "@/services/auth-service";
import { toast } from "react-toastify";

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export const useResetPassword = (token: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.resetPassword(token, { password: data.password });
      if (response.data?.success) {
        toast.success("Password reset successfully! You can now login with your new password.");
        navigate("/auth/login");
      } else {
        throw new Error("Failed to reset password");
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Password reset failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleResetPassword,
    isLoading,
    error,
  };
};
