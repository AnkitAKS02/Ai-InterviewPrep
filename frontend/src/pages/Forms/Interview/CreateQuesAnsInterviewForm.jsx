import React, { useState } from "react";
import InputCard from "../../../components/Input/InputCard.jsx";
import { Briefcase, FileText, Calendar, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateQuesAnsInterviewForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobRole || !jobDescription || !yearsOfExperience) {
      setError("Please fill all fields before continuing.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call/processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const formData = {
        jobRole,
        jobDescription,
        yearsOfExperience,
      };

      console.log("Form Data:", formData);

      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      // Navigate to next page
      navigate("/interview/questions", { state: formData });
      
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Create Your Interview
        </h3>

        <p className="text-lg text-gray-600">
          Enter details about the job role to generate personalized questions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Role Input */}
        <InputCard
          label="Job Role"
          placeholder="Eg: Frontend Developer, Data Scientist, Product Manager"
          icon={Briefcase}
          value={jobRole}
          onChange={setJobRole}
        />

        {/* Job Description Input */}
        <InputCard
          label="Job Description"
          placeholder="Brief job summary, key responsibilities, and required skills..."
          icon={FileText}
          value={jobDescription}
          onChange={setJobDescription}
        />

        {/* Years of Experience Input */}
        <InputCard
          label="Years of Experience"
          type="number"
          placeholder="Eg: 2, 5, 8"
          icon={Calendar}
          value={yearsOfExperience}
          onChange={setYearsOfExperience}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Questions...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate AI Questions</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Our AI will create personalized questions based on your role and experience level
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateQuesAnsInterviewForm;