import React, { useRef } from "react";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setImage(null);
    setPreview(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Preview Circle */}
      <div className="relative">
        <div
          className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-300 flex items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-sm">Click to Upload</span>
          )}
        </div>
        
        {/* Action Button - Upload when no image, Delete when image exists */}
        <div 
          className="absolute bottom-0.5 -right-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center cursor-pointer border-2 border-white"
          onClick={preview ? handleDelete : () => fileInputRef.current.click()}
        >
          {preview ? (
            // Delete icon (dustbin)
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          ) : (
            // Upload icon
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Label */}
      <p className="mt-3 text-gray-500 text-sm">Profile Photo</p>
    </div>
  );
};

export default ProfilePhotoSelector;