import { Link } from "react-router";
import { HiOutlinePlus, HiOutlineLogout } from "react-icons/hi";

interface HeaderProps {
  onCreatePost?: () => void;
  onLogout?: () => void;
}

export const Header = ({ onCreatePost, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-900 ml-56">
            Atlas
          </Link>

          <nav className="flex items-center gap-4">
            <button
              onClick={onCreatePost}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors"
            >
              <HiOutlinePlus className="w-5 h-5" />
              Create Post
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <HiOutlineLogout className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
