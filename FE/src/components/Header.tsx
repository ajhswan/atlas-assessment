import { Link } from "react-router";
import { HiOutlinePlus, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onCreatePost?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  userName?: string;
}

export const Header = ({ onCreatePost, onLogout, onProfileClick, userName }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 md:py-0 md:h-16">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <img 
                src="https://openvantage.co.za/wp-content/uploads/2024/03/OV_logo_long.png" 
                alt="OpenVantage Logo" 
                className="h-5 md:h-8"
              />
              <span className="text-lg md:text-2xl font-bold text-blue-900">Atlas</span>
            </Link>

            <div className="md:hidden flex items-center gap-2 pl-4 border-l border-gray-200">
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-lg transition-colors outline-none">
                  <HiOutlineUser className="w-5 h-5" />
                  {userName && (
                    <span className="font-medium">
                      {userName}
                    </span>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                    <HiOutlineUser className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="cursor-pointer">
                      <HiOutlineLogout className="w-4 h-4 mr-2" />
                      Login Page
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                    <HiOutlineLogout className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <nav className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={onCreatePost}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors w-full md:w-auto"
            >
              <HiOutlinePlus className="w-5 h-5" />
              Create Post
            </button>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200">
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-lg transition-colors outline-none">
                  <HiOutlineUser className="w-5 h-5" />
                  {userName && (
                    <span className="font-medium">
                      {userName}
                    </span>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                    <HiOutlineUser className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="cursor-pointer">
                      <HiOutlineLogout className="w-4 h-4 mr-2" />
                      Login Page
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                    <HiOutlineLogout className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
