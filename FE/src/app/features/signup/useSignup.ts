import { useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "@/services/auth-service";
import type { RegisterRequest } from "@/types/api";
import { toast } from "react-toastify";

export interface SignupFormData extends RegisterRequest {
  confirmPassword: string;
  title?: string;
}

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...registerData } = data;
      await authService.register(registerData);
      
      toast.success("Account created successfully! Please check your email for verification.");
      navigate("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSignup,
    isLoading,
    error,
  };
};
