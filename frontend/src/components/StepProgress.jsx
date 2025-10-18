import React from "react";

const StepProgress = ({ progress }) => {
  return (
    <div className="w-full">
          {/* Progress Bar Container */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        {/* Filled Progress */}
        <div
          className="h-3 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-[2px] transition-all duration-500 ease-out shadow-md"
          style={{ width: `${progress}%` }}
        >
          {/* Floating Label */}
          <div
            className="absolute -top-6 transform -translate-x-1/2 bg-purple-600 text-white text-[10px] font-semibold px-2 py-1 rounded-md shadow-md"
            style={{ left: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>

      {/* Status Text */}
      <div className="flex justify-between mt-2 text-sm font-medium text-gray-700">
        <span>Progress</span>
        <span className={progress === 100 ? "text-green-600" : "text-purple-600"}>
          {progress === 100 ? "✅ Completed" : "⏳ In Progress"}
        </span>
      </div>
    </div>
  );
};

export default StepProgress;
