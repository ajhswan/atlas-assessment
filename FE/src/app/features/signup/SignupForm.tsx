import { AuthForm } from "@/components/AuthForm";
import { useFetcher } from "react-router";
import { HiOutlineUser, HiOutlineIdentification, HiOutlineShieldCheck } from "react-icons/hi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { action } from "@/app/routes/auth.register";

export const SignupForm = () => {
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  const handleSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("title", data.title || "");
    formData.append("password", data.password);
    
    fetcher.submit(formData, { method: "POST" });
  };

  const isLoading = fetcher.state === "submitting";

  return (
    <AuthForm onSubmit={handleSubmit} className="space-y-3">
      {({ register, formState: { errors }, getValues }) => {
        return (
          <>
            <AuthForm.Title>Sign Up</AuthForm.Title>

            <AuthForm.Email
              register={register} 
              error={errors.email?.message as string} 
            />

            <AuthForm.Field
              name="firstName"
              label="First Name"
              register={register}
              error={errors.firstName?.message as string}
              icon={<HiOutlineUser />}
              validation={{
                required: "First name is required",
                minLength: {
                  value: 1,
                  message: "First name must not be empty"
                }
              }}
            />

            <AuthForm.Field
              name="lastName"
              label="Last Name"
              register={register}
              error={errors.lastName?.message as string}
              icon={<HiOutlineUser />}
              validation={{
                required: "Last name is required",
                minLength: {
                  value: 1,
                  message: "Last name must not be empty"
                }
              }}
            />

            <AuthForm.Select
              name="title"
              label="Title (Optional)"
              register={register}
              error={errors.title?.message as string}
              icon={<HiOutlineIdentification />}
              options={[
                { value: "Mr", label: "Mr" },
                { value: "Miss", label: "Miss" },
                { value: "Mrs", label: "Mrs" },
                { value: "Sir", label: "Sir" },
                { value: "Madam", label: "Madam" },
                { value: "Doctor", label: "Doctor" },
              ]}
              validation={{}}
            />

            <AuthForm.Password
              register={register}
              error={errors.password?.message as string}
              name="password"
              label="Password"
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
              {isLoading ? "Signing up..." : "Sign Up"}
            </AuthForm.Submit>
          </>
        );
      }}
    </AuthForm>
  );
};
