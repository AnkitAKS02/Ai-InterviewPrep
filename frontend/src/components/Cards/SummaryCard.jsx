import React from "react";
import { Trash2 } from "lucide-react";

const SummaryCard = ({
  colors = "from-indigo-100 to-indigo-200",
  role,
  topicsToFocus,
  experience,
  questions = [],
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="relative w-[400px] rounded-xl border border-gray-200 cursor-pointer transition-all hover:border-gray-300 hover:shadow-lg overflow-hidden"
    >
      {/* Top colored background for role + topics */}
      <div
        className={`p-5 ${colors} bg-gradient-to-r`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-lg bg-white text-gray-800 font-bold flex items-center justify-center shadow">
              {role?.split(" ").map((w) => w[0]).join("").toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{role}</h2>
              <p className="text-sm text-gray-700">{topicsToFocus}</p>
            </div>
          </div>

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-500  hover:text-red-800 p-1 rounded hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex items-center justify-between px-5 py-3 mt-3 mx-3 rounded-2xl text-xs text-gray-700 shadow-sm">
        <span className="px-2 py-1 rounded-full bg-white border border-gray-200 mr-2">
          Exp: {experience}
        </span>
        <span className="px-2 py-1 rounded-full bg-white border border-gray-200 mr-2">
          {questions.length} Q&A
        </span>
        <span className="px-2 py-1 rounded-full bg-white border border-gray-200 mr-2">
          Updated: {lastUpdated}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 px-6 py-5 border-t border-gray-200 leading-relaxed ">
        {description}
      </p>
    </div>
  );
};

export default SummaryCard;
