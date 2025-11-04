import { useState } from "react";
import { authService } from "@/services/auth-service";

export interface RecoveryFormData {
  email: string;
}

export const useRecovery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRecovery = async (data: RecoveryFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await authService.requestPasswordReset(data.email);
      if (response.data?.success) {
        setSuccess(true);
      } else {
        throw new Error("Failed to send password reset email");
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Password recovery failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleRecovery,
    isLoading,
    error,
    success,
  };
};
