import { Outlet, useLocation } from "react-router";

interface Tab {
  id: string;
  label: string;
  path: string;
}

export default function AuthLayout() {
  const tabs: Tab[] = [
    { id: "login", label: "Sign In", path: "/auth/login" },
    { id: "register", label: "Sign Up", path: "/auth/register" },
    { id: "recovery", label: "Password Recovery", path: "/auth/recovery" },
  ];

  const location = useLocation();
  return (
    <div className="min-h-screen bg-sky-50 flex items-start justify-center p-8 pt-20">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={tab.path}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors text-center block ${
                location.pathname === tab.path
                  ? "bg-white text-blue-900"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
