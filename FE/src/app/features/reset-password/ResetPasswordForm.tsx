import { AuthForm } from "@/components/AuthForm";
import { useResetPassword } from "./useResetPassword";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { handleResetPassword, isLoading, error } = useResetPassword(token);

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : "Password reset failed");
    }
  }, [error]);

  return (
    <AuthForm onSubmit={handleResetPassword} className="space-y-3">
      {({ register, formState: { errors }, getValues }) => {
        return (
          <>
            <AuthForm.Title>Reset Password</AuthForm.Title>

            <AuthForm.Password
              register={register}
              error={errors.password?.message as string}
              name="password"
              label="New Password"
            />

            <AuthForm.Field
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              register={register}
              error={errors.confirmPassword?.message as string}
              icon={<HiOutlineShieldCheck />}
              validation={{
                required: "Please confirm your password",
                validate: {
                  matchesPassword: (value: string) => 
                    value === getValues("password") || "Passwords do not match"
                }
              }}
            />

            <AuthForm.Submit disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </AuthForm.Submit>
          </>
        );
      }}
    </AuthForm>
  );
};
