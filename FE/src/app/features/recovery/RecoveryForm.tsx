import { AuthForm } from "@/components/AuthForm";
import { useRecovery } from "./useRecovery";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const RecoveryForm = () => {
  const { handleRecovery, isLoading, error, success } = useRecovery();

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : "Password recovery failed");
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Password reset link sent! Check your email.");
    }
  }, [success]);

  return (
    <AuthForm onSubmit={handleRecovery} className="space-y-3">
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
