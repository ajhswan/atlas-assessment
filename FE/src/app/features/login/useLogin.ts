import { useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "@/services/auth-service";
import type { LoginRequest } from "@/types/api";
import { toast } from "react-toastify";

export interface LoginFormData extends LoginRequest {}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.login(data);
      toast.success("Login successful! Welcome back.");
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Login failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    error,
  };
};
