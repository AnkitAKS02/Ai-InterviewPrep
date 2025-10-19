import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { BellIcon, UsersIcon, UserPlusIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/community", icon: UsersIcon, label: "Community" },
    { path: "/community/friends", icon: UsersIcon, label: "Friends" },
    { path: "/community/find", icon: UserPlusIcon, label: "Find New Friends" },
    { path: "/community/notifications", icon: BellIcon, label: "Notifications" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col h-screen sticky top-0 shadow-lg">
      {/* Navigation Section */}
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm"
                  : "hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
              }`}>
                <Icon className="size-5" />
              </div>
              <span className={`font-medium transition-colors duration-300 ${
                isActive
                  ? "text-blue-700"
                  : "text-gray-700 group-hover:text-blue-600"
              }`}>
                {item.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-6 border-t border-gray-200 mt-auto bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-white shadow-md overflow-hidden">
              <img
                src={authUser?.profilePic || "/default-avatar.png"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online status indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">{ authUser?.fullName || "Guest"}</p>
            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;