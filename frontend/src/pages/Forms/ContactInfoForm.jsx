import React from "react";
import InputCard from "../../components/Input/InputCard";

const ContactInfoForm = ({ contactInfo = {}, updateSection, onNext }) => {
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
        Contact Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputCard
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={contactInfo?.email || ""}
          onChange={(val) => handleChange("email", val)}
        />

        <InputCard
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={contactInfo?.phone || ""}
          onChange={(val) => handleChange("phone", val)}
        />

        <div className="col-span-2">
          <InputCard
            label="Location"
            placeholder="Enter your location"
            value={contactInfo?.location || ""}
            onChange={(val) => handleChange("location", val)}
          />
        </div>

        <InputCard
          label="LinkedIn"
          placeholder="LinkedIn Profile URL"
          value={contactInfo?.linkedin || ""}
          onChange={(val) => handleChange("linkedin", val)}
        />

        <InputCard
          label="GitHub"
          placeholder="GitHub Profile URL"
          value={contactInfo?.github || ""}
          onChange={(val) => handleChange("github", val)}
        />

        <InputCard
          label="Website"
          placeholder="Your personal or portfolio website"
          value={contactInfo?.website || ""}
          onChange={(val) => handleChange("website", val)}
        />
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

export default ContactInfoForm;
