import { AuthForm } from "@/components/AuthForm";
import { useLogin } from "./useLogin";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const { handleLogin, isLoading, error } = useLogin();

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  }, [error]);

  return (
    <AuthForm onSubmit={handleLogin} className="space-y-3">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <AuthForm.Title>Log In</AuthForm.Title>

            <AuthForm.Email
              register={register} 
              error={errors.email?.message as string} 
            />

            <AuthForm.Password
              register={register}
              error={errors.password?.message as string}
              name="password"
              label="Password"
            />

            <AuthForm.Submit disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </AuthForm.Submit>
          </>
        );
      }}
    </AuthForm>
  );
};
