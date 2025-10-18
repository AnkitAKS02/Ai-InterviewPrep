import React from "react";

const Progress = ({ progress = 0, color = "#3B82F6", bgColor = "#E5E7EB" }) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 5);
  const dotCount = Math.round(normalizedProgress);

  return (
    <div className="flex items-center gap-1 ml-1">
      {/* Optional progress number */}
      {/* <span className="text-xs text-gray-500">{progress}</span> */}
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            index < dotCount ? "shadow-sm" : ""
          }`}
          style={{
            backgroundColor: index < dotCount ? color : bgColor,
          }}
        />
      ))}
    </div>
  );
};

export default Progress;
