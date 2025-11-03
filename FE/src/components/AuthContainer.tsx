import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  path: string;
}

interface AuthContainerProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function AuthContainer({ tabs, defaultTab }: AuthContainerProps) {
  const visibleTabs = tabs.slice(0, 3);
  const location = useLocation();
  const navigate = useNavigate();
  
  const getInitialTab = () => {
    const currentTab = visibleTabs.find((tab) => tab.path === location.pathname);
    return currentTab?.id || defaultTab || visibleTabs[0]?.id;
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    const currentTab = visibleTabs.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname, visibleTabs]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  const activeContent = visibleTabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex border-b">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">{activeContent}</div>
    </div>
  );
}
