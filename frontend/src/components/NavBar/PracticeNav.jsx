import { useState } from "react";
import { Link } from "react-router-dom";

const PracticeNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Practice Link */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
      >
        Practice
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
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <Link
            to="/question-dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Question
          </Link>
          <Link
            to="/quiz-dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Quiz
          </Link>
        </div>
      )}
    </div>
  );
};

export default PracticeNav;
