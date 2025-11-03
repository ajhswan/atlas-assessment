import { AuthContainer } from "@/components/AuthContainer";

export default function Recovery() {
  const tabs = [
    { id: "login", label: "Login", path: "/login", content: <div>Login content</div> },
    { id: "register", label: "Register", path: "/register", content: <div>Register content</div> },
    { id: "recovery", label: "Forgot Password", path: "/recovery", content: <div>Recovery content</div> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <AuthContainer tabs={tabs} />
    </div>
  );
}
