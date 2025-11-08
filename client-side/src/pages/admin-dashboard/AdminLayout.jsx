import React, { useState, useCallback, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import FloatingChat from "../../components/ui/FloatingChat";
import Footer from "../../components/ui/Footer";
import Icon from "../../components/AppIcon";
import DateRangeFilter from "./components/DateRangeFilter";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
    range: "30days",
  });

  // Mock user data
  const user = {
    name: "Rajesh Patel",
    email: "rajesh.patel@realconnect.com",
    role: "admin",
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const handleDateRangeChange = useCallback((newRange) => {
    setDateRange(newRange);
    console.log("Date range changed:", newRange);
  }, []);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  // Sidebar navigation items - Only Dashboard and Reports
  const sidebarItems = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "LayoutDashboard",
        path: "/admin/dashboard",
      },
      {
        id: "reports",
        label: "Reports",
        icon: "BarChart3",
        path: "/admin/reports",
      },
      {
        id: "properties",
        label: "Properties",
        icon: "Building",
        path: "/admin/properties",
      },
      {
        id: "post-property",
        label: "Post Property",
        icon: "PlusCircle",
        path: "/admin/post-property",
      },
      {
        id: "users",
        label: "Users",
        icon: "Users",
        path: "/admin/users",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: "TrendingUp",
        path: "/admin/analytics",
      },
    ],
    []
  );

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        user={user}
        notificationCount={8}
        onLogout={handleLogout}
        onSearch={() => {}}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="hidden lg:block w-64 bg-card border-r border-border flex-shrink-0 fixed top-20 bottom-0 left-0 z-30">
          <div className="p-6 h-full flex flex-col">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Admin Dashboard
              </h2>

              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActivePath(item.path)
                        ? "text-primary bg-primary/10 border border-primary/20 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      size={18}
                      className={isActivePath(item.path) ? "text-primary" : ""}
                    />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Date Range Filter at bottom of sidebar */}
            <div className="mt-auto pt-6 border-t border-border">
              <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
            </div>
          </div>
        </div>

        {/* Main Content Area with custom scrollbar */}
        <div className="flex-1 lg:ml-64 min-h-0">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <div className="min-h-full flex flex-col">
              {/* Outlet content with proper spacing */}
              <div className="flex-1">
                <Outlet />
              </div>

              {/* Footer */}
              <Footer />
            </div>
          </div>
        </div>
      </div>

      <FloatingChat isOpen={isChatOpen} onToggle={handleToggleChat} />

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default React.memo(AdminLayout);
