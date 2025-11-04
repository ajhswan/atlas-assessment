import { HiX } from "react-icons/hi";
import type { User } from "@/types/api";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: User | null;
}

export const UserProfileModal = ({ isOpen, onClose, userData }: UserProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900 bg-opacity-20"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {userData?.id && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                User ID
              </label>
              <p className="text-gray-900 font-mono text-sm">{userData.id}</p>
            </div>
          )}

          {userData?.title && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Title
              </label>
              <p className="text-gray-900">{userData.title}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              First Name
            </label>
            <p className="text-gray-900">{userData?.first_name || "N/A"}</p>
          </div>

          {userData?.middle_name && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Middle Name
              </label>
              <p className="text-gray-900">{userData.middle_name}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Last Name
            </label>
            <p className="text-gray-900">{userData?.last_name || "N/A"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            <p className="text-gray-900">{userData?.email || "N/A"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Organization ID
            </label>
            <p className="text-gray-900 font-mono text-sm">{userData?.organization_id}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
