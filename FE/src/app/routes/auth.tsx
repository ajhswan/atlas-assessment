import { Outlet, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";

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
  const navigate = useNavigate();

  const getInitialTab = () => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    return currentTab?.id || tabs[0].id;
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-8">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-blue-900"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <h2 className="px-4 text-lg font-semibold text-blue-900">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
