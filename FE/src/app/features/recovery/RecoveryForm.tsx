import { AuthForm } from "@/components/AuthForm";
import { useFetcher } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { action } from "@/app/routes/auth.recovery";

export const RecoveryForm = () => {
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data?.error]);

  useEffect(() => {
    if (fetcher.data?.success) {
      toast.success("Password reset link sent! Check your email.");
    }
  }, [fetcher.data?.success]);

  const handleSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("email", data.email);
    
    fetcher.submit(formData, { method: "POST" });
  };

  const isLoading = fetcher.state === "submitting";
  const success = fetcher.data?.success;

  return (
    <AuthForm onSubmit={handleSubmit} className="space-y-3">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <AuthForm.Title>Password Recovery</AuthForm.Title>

            <AuthForm.Email
              register={register} 
              error={errors.email?.message as string} 
            />

            <AuthForm.Submit disabled={isLoading || success}>
              {isLoading ? "Sending..." : success ? "Email Sent" : "Send Reset Link"}
            </AuthForm.Submit>
          </>
        );
      }}
    </AuthForm>
  );
};
