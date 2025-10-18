import { Link, useLocation } from "react-router";
import useAuthStore from "../../stores/useAuthStore.js";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/friends", icon: UsersIcon, label: "Friends" },
    { path: "/notifications", icon: BellIcon, label: "Notifications" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Navigation Section */}
      <nav className="flex-1 p-5 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              <Icon
                className={`size-5 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-5 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {authUser?.profilePicture ? (
              <img
                src={authUser.profilePicture}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600 font-medium">
                {authUser?.fullName?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm text-gray-900 truncate">
              {authUser?.fullName || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
