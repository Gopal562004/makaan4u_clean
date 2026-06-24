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
      <div className="hidden lg:block pt-4 sticky top-24">
        <div className="mb-10 pl-2">
          <div className="relative inline-block">
            {isValidAvatar(user?.avatar) ? (
              <img
                src={user.avatar}
                alt={user?.name}
                className="w-16 h-16 rounded-none mx-auto mb-3 object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-none mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-bold text-black">
                  {getUserInitials(user?.name)}
                </span>
              </div>
            )}
          </div>
          <h3 className="font-bold text-black text-xl tracking-tight uppercase">{user?.name}</h3>
          <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center justify-between py-3 px-4 transition-all duration-300 group ${
                activeTab === tab.id
                  ? "border-l-2 border-blue-600 font-bold text-blue-600 bg-gray-50"
                  : "border-l-2 border-transparent text-gray-500 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <span className={`mr-4 transition-transform duration-300 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                  {tab.icon}
                </span>
                <span className="uppercase tracking-widest text-xs">{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-8 pt-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center py-3 px-4 text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-all duration-300 group uppercase tracking-widest text-xs"
          >
            <LogOut className="w-5 h-5 mr-4 text-gray-400 group-hover:text-blue-600" strokeWidth={1.5} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe shadow-lg">
        <div className="flex justify-around items-center px-0 py-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-blue-600 border-t-2 border-blue-600 -mt-[1px] bg-gray-50"
                  : "text-gray-400 hover:bg-gray-50 border-t-2 border-transparent -mt-[1px]"
              }`}
            >
              <span className="mb-1">
                {tab.icon}
              </span>
              <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
