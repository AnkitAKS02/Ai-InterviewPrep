// src/components/communityComponents/FriendsSection.jsx
import React, { useEffect } from "react";
import { Link } from "react-router";
import { UsersIcon } from "lucide-react";
import { useFriendStore } from "../../stores/useFriendStore.js";
import FriendCard from "../../components/communityComponents/FriendCard.jsx";
import NoFriendsFound from "../../components/communityComponents/NoFriendComponent.jsx";

const Friends = () => {
  const {
    myFriends,
    getMyFriends,
    isLoadingFriends,
  } = useFriendStore();

  // Load friends on mount
  useEffect(() => {
    getMyFriends();
  }, []);

  return (
    <section className="mb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Friends
          </h2>
          <p className="text-gray-600">
            Connect and collaborate with your tech partners
          </p>
        </div>

        <Link
          to="/notifications"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
        >
          <UsersIcon className="size-5" />
          <span>Friend Requests</span>
        </Link>
      </div>

      {/* Loading State */}
      {isLoadingFriends ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : myFriends.length === 0 ? (
        // No friends found
        <NoFriendsFound />
      ) : (
        // Friends Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myFriends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Friends;
