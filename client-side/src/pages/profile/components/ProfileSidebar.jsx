import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const ProfileSidebar = ({
  activeTab,
  onTabChange,
  tabs,
  user,
  onLogout,
  getUserInitials,
  isValidAvatar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    if (tabId === "profile") {
      navigate("/profile");
    } else {
      navigate(`/profile/${tabId}`);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
        {/* User Info */}
        <div className="text-center mb-6">
          {isValidAvatar(user?.avatar) ? (
            <img
              src={user.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mx-auto mb-3 border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {getUserInitials(user?.name)}
              </span>
            </div>
          )}
          <h3 className="font-bold text-gray-900 text-lg">{user?.name}</h3>
          <p className="text-gray-600 text-sm">{user?.email}</p>
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mt-2">
            {user?.role}
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around items-center py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500"
              }`}
            >
              <span className="text-lg mb-1">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
