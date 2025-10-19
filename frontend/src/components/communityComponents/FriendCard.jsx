import { Link } from "react-router";
import { MessageCircleIcon, MapPinIcon } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group">
      <div className="p-6 space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-white shadow-md overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
              <img 
                src={friend.profilePicture || friend.profilePic} 
                alt={friend.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 truncate">
              {friend.fullName}
            </h3>
            {friend.location && (
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPinIcon className="size-3 mr-1" />
                <span className="truncate">{friend.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tech Interest & Skill Level */}
        <div className="flex flex-wrap gap-2">
          {friend.techIntrest && (
            <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {friend.techIntrest}
            </span>
          )}
          {friend.skillLevel && (
            <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
              {friend.skillLevel}
            </span>
          )}
        </div>

        {/* Message Button */}
        <Link 
          to={`/chat/${friend._id}`} 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center space-x-2 shadow-lg group-hover:shadow-xl"
        >
          <MessageCircleIcon className="size-5" />
          <span>Message</span>
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;