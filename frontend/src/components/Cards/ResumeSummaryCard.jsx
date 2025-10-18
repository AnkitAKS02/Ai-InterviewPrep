import React, { useEffect, useState } from "react";
import { getLightColorFromImage } from "../../lib/helper.js";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => setBgColor(color))
        .catch(() => setBgColor("#ffffff"));
    }
  }, [imgUrl]);

  return (
    <div
      className="h-[300px] flex flex-col items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer p-6 m-2 transition-colors"
      style={{ backgroundColor: bgColor }}
      onClick={onSelect}
    >
      <div className="flex items-center justify-center w-full">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="resume preview"
            className="w-[100px] h-[200px] rounded shadow-sm object-cover"
          />
        ) : (
          <div className="w-[100px] h-[200px] bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="w-full bg-white px-4 py-3 rounded-b-lg">
        <h5 className="text-sm font-medium truncate">{title}</h5>
        <p className="text-xs font-medium text-gray-500 mt-1">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
