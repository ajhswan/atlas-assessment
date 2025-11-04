import { AuthForm } from "@/components/AuthForm";
import { useFetcher } from "react-router";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { action } from "@/app/routes/reset-password.$token";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  const handleSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("password", data.password);
    
    fetcher.submit(formData, { method: "POST" });
  };

  const isLoading = fetcher.state === "submitting";

  return (
    <AuthForm onSubmit={handleSubmit} className="space-y-3">
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
