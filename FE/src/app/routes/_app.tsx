import { Outlet, useNavigate, useLoaderData } from "react-router";
import { useState } from "react";
import type { Route } from "../+types/routes/_app";
import { Header } from "@/components/Header";
import { UserProfileModal } from "@/components/UserProfileModal";
import { requireAuth } from "../session.server";
import { getUserData } from "../api.server";
import type { UserResponse } from "@/types/api";

export async function loader({ request }: Route.LoaderArgs) {
  const { token } = await requireAuth(request);
  
  let userData = null;
  let userName = null;
  
  try {
    const response = await getUserData(token) as UserResponse;
    userData = response.data;
    
    if (userData?.first_name || userData?.last_name) {
      userName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
  
  return { userName, userData };
}

export default function AppLayout() {
  const { userName, userData } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleCreatePost = () => {
    navigate("/posts/new");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        onCreatePost={handleCreatePost} 
        onLogout={handleLogout} 
        onProfileClick={handleProfileClick}
        userName={userName || undefined}
      />
      
      <UserProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userData={userData || null}
      />
      
      <Outlet />
    </div>
  );
}
