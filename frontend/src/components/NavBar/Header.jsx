import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PracticeNav from "./PracticeNav";
import { useAuthStore } from "../../stores/useAuthStore";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogged, authUser } = useAuthStore();
  console.log(authUser);
  const [isOpenProfileCard, setIsOpenProfileCard]= useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="font-bold text-xl text-gray-900">AI-InterviewPrez</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
            {/* Add other nav items here */}
          </nav> 

          {/* Right side buttons */}
          {!isOpenProfileCard ? (
            <div className="hidden md:flex items-center space-x-4">
            {/* Use Link instead of <a> */}
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
          </div>
          ): (
              <ProfileInfoCard/>
          )}
          

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* ... other nav items */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/login"
                  className="block font-medium text-gray-700 hover:text-gray-900 mb-4"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors text-center"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
