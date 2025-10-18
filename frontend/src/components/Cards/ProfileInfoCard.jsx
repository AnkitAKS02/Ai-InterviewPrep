import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore.js"; // your zustand store
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { authUser, logout } = useAuthStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // clear auth state
    navigate("/"); // redirect to login
  };

  if (!authUser) return null; // or show a login button

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Card */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
      >
        <img
          src={authUser.profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-700">{authUser.fullName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="flex flex-col items-center gap-2 p-4 border-b border-gray-200">
            <img
              src={authUser.profilePicture}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <p className="font-medium text-gray-700">{authUser.fullName}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-b-md"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoCard;
