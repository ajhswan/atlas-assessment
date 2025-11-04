import { AuthForm } from "@/components/AuthForm";
import { useFetcher, useSearchParams } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { action } from "@/app/routes/auth.login";

export const LoginForm = () => {
  const fetcher = useFetcher<typeof action>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("reset") === "success") {
      toast.success("Password reset successfully! You can now log in with your new password.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  const handleSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    
    fetcher.submit(formData, { method: "POST" });
  };

  const isLoading = fetcher.state === "submitting";

  return (
    <AuthForm onSubmit={handleSubmit} className="space-y-3">
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
