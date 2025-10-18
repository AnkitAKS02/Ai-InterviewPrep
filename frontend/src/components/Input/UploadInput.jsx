import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { formatSize } from "../../lib/helper.js"; // helper to convert bytes to KB/MB

const UploadInput = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const allowedTypes = ["application/pdf", "text/plain"];
    if (!allowedTypes.includes(uploadedFile.type)) {
      toast.error("Only PDF or TXT files are allowed.");
      e.target.value = ""; // clear input
      return;
    }

    setFile(uploadedFile);
    onFileSelect(uploadedFile);
    toast.success("File uploaded successfully!");
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileSelect(null);
    fileInputRef.current.value = ""; // ✅ reset input field
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition-all duration-200 relative">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <p className="text-gray-500">
          Click to upload or drag and drop <br />
          <span className="text-sm text-gray-400">
            Only PDF or TXT (max 10MB)
          </span>
        </p>
      </div>

      {/* File Preview */}
      {file && (
        <div className="flex items-center justify-between bg-white shadow-sm rounded-xl p-3 border border-gray-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={file.type === "application/pdf" ? "/pdf.png" : "/pdf.png"}
              alt="file-icon"
              className="w-10 h-10 object-contain"
            />
            <div className="overflow-hidden">
              <p className="text-gray-800 font-medium text-sm truncate max-w-[200px]">
                {file.name}
              </p>
              <p className="text-sm text-gray-400">{formatSize(file.size)}</p>
            </div>
          </div>

          <button
            onClick={handleRemoveFile}
            className="text-gray-500 hover:text-red-500 transition-colors p-2"
          >
            <IoMdClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadInput;
