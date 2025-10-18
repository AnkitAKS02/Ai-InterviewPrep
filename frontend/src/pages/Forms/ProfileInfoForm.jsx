import React from "react";
import InputCard from "../../components/Input/InputCard";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector.jsx";

const ProfileInfoForm = ({ profileData = {}, updateSection, onNext }) => {
    const handleChange = (key, value) => {
        updateSection(key, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext && onNext();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Personal Information
            </h2>

            {/* Profile Image Selector */}
            <div className="mt-4">
                <ProfilePhotoSelector
                    image={profileData?.profileImg || profileData?.profilePreviewUrl}
                    setImage={(value) => updateSection("profileImg", value)}
                    preview={profileData?.profilePreviewUrl}
                    setPreview={(value) => updateSection("profilePreviewUrl", value)}
                />
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputCard
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={profileData?.fullName || ""}
                    onChange={(val) => handleChange("fullName", val)}
                />

                <InputCard
                    label="Designation"
                    placeholder="Enter your designation"
                    value={profileData?.designation || ""}
                    onChange={(val) => handleChange("designation", val)}
                />

                <div className="col-span-2 mt-3">
                    <label className="block text-gray-700 font-medium text-sm mb-2">
                        Summary
                    </label>
                    <textarea
                        placeholder="Short Introduction"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-base resize-none"
                        value={profileData.summary || ""}
                        onChange={(e) => updateSection("summary", e.target.value)}
                    />
                </div>

            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
            >
                Next
            </button>
        </form>
    );
};

export default ProfileInfoForm;
