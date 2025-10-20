import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PracticeNav from "./PracticeNav";
import { useAuthStore } from "../../stores/useAuthStore.js";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogged, authUser } = useAuthStore();
  const [isOpenProfileCard, setIsOpenProfileCard] = useState(false);

  useEffect(() => {
    setIsOpenProfileCard(isLogged);
    console.log(authUser);
    console.log("Auth status:", isLogged);
  }, [isLogged]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg relative">
              <div className="w-6 h-4 bg-white rounded-lg rounded-br-none"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
            <span className="font-bold text-xl text-gray-900">
              AI-InterviewPrez
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link
              to="/resume-dashboard"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Resume AI
            </Link>
            <PracticeNav />
            <Link
              to="/resume-analyser"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              CVAnalyser
            </Link>
            <Link
              to="/community"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Community
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {!isOpenProfileCard ? (
              <>
                <Link
                  to="/login"
                  className="font-medium text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  Create Free Account
                </Link>
              </>
            ) : (
              <ProfileInfoCard />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="flex flex-col space-y-4 px-6 py-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600">
            Home
          </Link>
          <Link
            to="/resume-dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 hover:text-blue-600"
          >
            Resume AI
          </Link>
          <Link
            to="/resume-analyser"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 hover:text-blue-600"
          >
            CVAnalyser
          </Link>
          <PracticeNav />
          <Link
            to="/community"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 hover:text-blue-600"
          >
            Community
          </Link>

          {/* Auth Buttons */}
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            {!isOpenProfileCard ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-800 hover:text-blue-600"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-center"
                >
                  Create Free Account
                </Link>
              </>
            ) : (
              <ProfileInfoCard />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
