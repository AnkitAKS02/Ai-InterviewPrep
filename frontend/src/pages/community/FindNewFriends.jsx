// src/components/communityComponents/FindFriendsSection.jsx
import React, { useEffect } from "react";
import { MapPinIcon, SparklesIcon, CheckCircleIcon, UserPlusIcon } from "lucide-react";
import { useFriendStore } from "../../stores/useFriendStore.js";

const FindNewFriends = () => {
  const {
    recommendedUsers,
    getRecommendedUsers,
    outgoingRequests,
    getOutgoingFriendRequests,
    sendFriendRequest,
    isLoadingRecommended,
    isSendingRequest,
  } = useFriendStore();

  // Fetch recommended users and outgoing requests on mount
  useEffect(() => {
    getRecommendedUsers();
    getOutgoingFriendRequests();
  }, []);

  return (
    <section>
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <SparklesIcon className="size-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">
                Meet New Learners
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Discover perfect tech partners based on your profile and interests
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoadingRecommended ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : recommendedUsers.length === 0 ? (
        // No recommendations
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
          <SparklesIcon className="size-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-xl text-gray-900 mb-3">
            No recommendations available
          </h3>
          <p className="text-gray-600">
            Check back later for new tech partners matching your interests!
          </p>
        </div>
      ) : (
        // Recommended Users Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedUsers.map((user) => {
            const hasRequestBeenSent = outgoingRequests.some(
              (req) => req._id === user._id || req.receiver === user._id
            );

            return (
              <div
                key={user._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  {/* User Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-white shadow-md overflow-hidden">
                        <img
                          src={user.profilePicture}
                          alt={user.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {user.fullName}
                      </h3>
                      {user.location && (
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPinIcon className="size-4 mr-1" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tech Interests & Skill Level */}
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(user.techIntrest)
                      ? user.techIntrest.map((tech) => (
                          <span
                            key={tech}
                            className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))
                      : user.techIntrest && (
                          <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            {user.techIntrest}
                          </span>
                        )}

                    {user.skillLevel && (
                      <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                        {user.skillLevel}
                      </span>
                    )}
                  </div>

                  {/* Bio */}
                  {user.bio && (
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {user.bio}
                    </p>
                  )}

                  {/* Action Button */}
                  <button
                    className={`w-full mt-4 px-4 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-2 ${
                      hasRequestBeenSent || isSendingRequest
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 shadow-lg"
                    }`}
                    onClick={() => sendFriendRequest(user._id)}
                    disabled={hasRequestBeenSent || isSendingRequest}
                  >
                    {hasRequestBeenSent ? (
                      <>
                        <CheckCircleIcon className="size-5" />
                        <span>Request Sent</span>
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="size-5" />
                        <span>Send Friend Request</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FindNewFriends;
