import React, { useState } from "react";
import toast from "react-hot-toast";
import { LoaderIcon, ShuffleIcon, User } from "lucide-react";
import { TECH_INTERESTS, SKILL_LEVELS } from "../../../constants";
import InputCard from "../../../components/Input/InputCard.jsx";
import { useAuthStore } from "../../../stores/useAuthStore.js";
const OnboardingPage = () => {
  const { authUser, onboard, isOnboarding } = useAuthStore();
  
  const isPending = isOnboarding;
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    techInterest: authUser?.techInterest || "",
    skillLevel: authUser?.skillLevel || "",
    collaborationStyle: authUser?.collaborationStyle || "",
    profilePicture: authUser?.profilePicture || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboard({ fullName:formState.fullName, bio:formState.bio, techIntrests:formState.techInterest, skillLevel:formState.skillLevel, collaborationStyle:formState.collaborationStyle });
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePicture: randomAvatar });
    toast.success("Avatar changed successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Complete Your{" "}
              <span className="relative">
                Profile
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 300 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 8 Q150 2 295 8"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Tell us about yourself before meeting the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* PROFILE PICTURE SECTION */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                  {formState.profilePicture ? (
                    <img
                      src={formState.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <User size={32} />
                      <span className="text-xs mt-1">No Avatar</span>
                    </div>
                  )}
                </div>
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 border-r-purple-400 animate-spin-slow"></div>
              </div>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
              >
                <ShuffleIcon size={18} />
                <span>Shuffle Avatar</span>
              </button>
            </div>

            {/* FULL NAME */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400"
              />
            </div>

            {/* BIO */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Bio</label>
              <textarea
                placeholder="Tell others about yourself..."
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 resize-none"
              />
            </div>

            {/* TECH INTEREST */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Tech Interest</label>
              <div className="relative">
                <select
                  value={formState.techInterest}
                  onChange={(e) => setFormState({ ...formState, techInterest: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select your tech interest</option>
                  {TECH_INTERESTS.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* SKILL LEVEL */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Skill Level</label>
              <div className="relative">
                <select
                  value={formState.skillLevel}
                  onChange={(e) => setFormState({ ...formState, skillLevel: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select your skill level</option>
                  {SKILL_LEVELS.map((level) => (
                    <option key={level} value={level.toLowerCase()}>
                      {level}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* COLLABORATION STYLE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Collaboration Style</label>
              <input
                type="text"
                placeholder="How do you prefer to collaborate?"
                value={formState.collaborationStyle}
                onChange={(e) => setFormState({ ...formState, collaborationStyle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isPending ? (
                <>
                  <LoaderIcon className="animate-spin" size={20} />
                  <span>Onboarding...</span>
                </>
              ) : (
                <span>Complete Onboarding</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        /* Style the select dropdown options */
        select option {
          padding: 12px;
          background: white;
          max-height: 200px;
          overflow-y: auto;
        }
        
        /* Custom scrollbar for dropdown */
        select {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }
        
        select::-webkit-scrollbar {
          width: 6px;
        }
        
        select::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 3px;
        }
        
        select::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        
        select::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default OnboardingPage;