import type { PropsWithChildren, ReactNode } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineIdentification } from "react-icons/hi";

type AuthFormProps = PropsWithChildren & {
  onSubmit: (data: any) => void | Promise<void>;
  className?: string;
};

export const AuthForm = ({ children, onSubmit, className = "" }: AuthFormProps) => {
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = methods.handleSubmit(
    (data) => {
      console.log('Form validation passed', data);
      onSubmit(data);
    },
    (errors) => {
      console.log('Form validation failed', errors);
    }
  );

  return (
    <form onSubmit={handleFormSubmit} noValidate className={`space-y-4 ${className}`}>
      {typeof children === "function" ? children(methods) : children}
    </form>
  );
};

interface AuthFormTitleProps {
  children: ReactNode;
}

const AuthFormTitle = ({ children }: AuthFormTitleProps) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex-1 border-t border-border"></div>
      <h2 className="px-4 text-2xl font-semibold text-blue-900">
        {children}
      </h2>
      <div className="flex-1 border-t border-border"></div>
    </div>
  );
};

interface AuthFormFieldProps {
  name: string;
  label: string;
  type?: string;
  register: UseFormReturn["register"];
  error?: string;
  validation?: Record<string, any>;
  icon?: ReactNode;
}

interface AuthFormSelectProps {
  name: string;
  label: string;
  register: UseFormReturn["register"];
  error?: string;
  options: { value: string; label: string }[];
  validation?: Record<string, any>;
  icon?: ReactNode;
}

const AuthFormField = ({ 
  name, 
  label, 
  type = "text", 
  register, 
  error,
  validation = {},
  icon
}: AuthFormFieldProps) => {
  return (
    <div>
      <div className="relative flex items-stretch">
        {icon && (
          <div className="flex items-center justify-center w-10 bg-white text-blue-900 rounded-l-md border border-r-0 border-input text-lg [&>svg]:stroke-[1]">
            {icon}
          </div>
        )}
        <input
          id={name}
          type={type}
          placeholder=" "
          {...register(name, validation)}
          className={`peer w-full px-3 py-2.5 text-sm border border-input shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] bg-background text-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 ${icon ? 'rounded-r-md' : 'rounded-md'}`}
        />
        <label 
          htmlFor={name} 
          className={`absolute top-1/2 -translate-y-1/2 text-sm font-normal text-gray-500 bg-transparent transition-all pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-blue-900 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-blue-900 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 ${icon ? 'left-12' : 'left-3'}`}
        >
          {label}
        </label>
      </div>
      <div className="h-4 mt-0.5">
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

const AuthFormSelect = ({ 
  name, 
  label, 
  register, 
  error,
  options,
  validation = {},
  icon
}: AuthFormSelectProps) => {
  return (
    <div>
      <div className="relative flex items-stretch">
        {icon && (
          <div className="flex items-center justify-center w-10 bg-white text-blue-900 rounded-l-md border border-r-0 border-input text-lg [&>svg]:stroke-[1]">
            {icon}
          </div>
        )}
        <select
          id={name}
          {...register(name, validation)}
          className={`peer w-full px-3 py-2.5 text-sm border border-input shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] bg-background text-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 appearance-none cursor-pointer ${icon ? 'rounded-r-md' : 'rounded-md'}`}
        >
          <option value=""></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label 
          htmlFor={name} 
          className={`absolute top-1/2 -translate-y-1/2 text-sm font-normal text-gray-500 bg-transparent transition-all pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-blue-900 peer-focus:bg-white peer-focus:px-1 peer-[select:not([value=''])]:top-0 peer-[select:not([value=''])]:text-xs peer-[select:not([value=''])]:font-medium peer-[select:not([value=''])]:text-blue-900 peer-[select:not([value=''])]:bg-white peer-[select:not([value=''])]:px-1 ${icon ? 'left-12' : 'left-3'}`}
        >
          {label}
        </label>
      </div>
      <div className="h-4 mt-0.5">
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

interface AuthFormEmailProps {
  register: UseFormReturn["register"];
  error?: string;
  required?: boolean;
}

const AuthFormEmail = ({ register, error, required = true }: AuthFormEmailProps) => {
  return (
    <AuthFormField
      name="email"
      label="Email"
      type="text"
      register={register}
      error={error}
      icon={<HiOutlineMail />}
      validation={{
        required: required ? "Email is required" : false,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      }}
    />
  );
};

interface AuthFormPasswordProps {
  register: UseFormReturn["register"];
  error?: string;
  name?: string;
  label?: string;
  required?: boolean;
}

const AuthFormPassword = ({ 
  register, 
  error, 
  name = "password",
  label = "Password",
  required = true 
}: AuthFormPasswordProps) => {
  return (
    <AuthFormField
      name={name}
      label={label}
      type="password"
      register={register}
      error={error}
      icon={<HiOutlineLockClosed />}
      validation={{
        required: required ? "Password is required" : false,
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters"
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
          message: "Password must contain uppercase, lowercase, number, and special character"
        }
      }}
    />
  );
};

interface AuthFormSubmitProps {
  children: ReactNode;
  disabled?: boolean;
}

const AuthFormSubmit = ({ children, disabled = false }: AuthFormSubmitProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full py-2 px-4 text-base font-semibold bg-blue-900 text-white rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
    >
      {children}
    </button>
  );
};

interface AuthFormResetProps {
  children: ReactNode;
  onClick?: () => void;
}

const AuthFormReset = ({ children, onClick }: AuthFormResetProps) => {
  return (
    <button
      type="reset"
      onClick={onClick}
      className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

interface AuthFormActionsProps {
  children: ReactNode;
}

const AuthFormActions = ({ children }: AuthFormActionsProps) => {
  return (
    <div className="flex gap-4 pt-4">
      {children}
    </div>
  );
};

interface AuthFormLinkProps {
  href: string;
  children: ReactNode;
}

const AuthFormLink = ({ href, children }: AuthFormLinkProps) => {
  return (
    <a href={href} className="text-sm text-primary hover:underline">
      {children}
    </a>
  );
};

interface AuthFormErrorProps {
  children: ReactNode;
}

const AuthFormError = ({ children }: AuthFormErrorProps) => {
  return (
    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
      <p className="text-sm text-destructive">{children}</p>
    </div>
  );
};

AuthForm.Title = AuthFormTitle;
AuthForm.Field = AuthFormField;
AuthForm.Select = AuthFormSelect;
AuthForm.Email = AuthFormEmail;
AuthForm.Password = AuthFormPassword;
AuthForm.Submit = AuthFormSubmit;
AuthForm.Reset = AuthFormReset;
AuthForm.Actions = AuthFormActions;
AuthForm.Link = AuthFormLink;
AuthForm.Error = AuthFormError;
