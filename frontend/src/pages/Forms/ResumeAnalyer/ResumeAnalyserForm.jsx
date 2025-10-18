import React, { useState } from "react";
import InputCard from "../../../components/Input/InputCard.jsx"
import UploadInput from "../../../components/Input/UploadInput.jsx";// your provided InputCard
import { useAIStore } from "../../../stores/useAIStore.js";
import { useNavigate } from "react-router-dom";
const ResumeAnalyzerForm = () => {
  const navigate = useNavigate();
  const { analyzeResume,loading } = useAIStore();
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const isProcessing = loading;
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!resumeFile) return;
    // const img = convertPdfToImage(resumeFile);
    console.log({ company, jobTitle, jobDesc, resumeFile });
    const res = analyzeResume({ file: resumeFile, jobTitle, jobDescription: jobDesc });
    if (res) {
      navigate('/resume-analyser-feedback');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Smart feedback for your dream job
        </h1>

        {isProcessing ? (
          <>
            <h2>The Resume is being analysed</h2>
            <img src="/resume-scan.gif" className="w-full" />
          </>
        ) : (
          <h2 className="text-center text-gray-500 mb-8 text-sm">
            Drop your resume for an ATS score and improvement tips.
          </h2>
        )}


        {/* Form */}
        {!isProcessing && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputCard
              label="Company Name"
              placeholder="e.g. Google"
              value={company}
              onChange={setCompany}
            />
            <InputCard
              label="Job Title"
              placeholder="e.g. Frontend Developer"
              value={jobTitle}
              onChange={setJobTitle}
            />
            <div className="w-full mb-5">
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Job Description
              </label>
              <textarea
                placeholder="Write a clear & concise job description with responsibilities & expectations..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-base min-h-[120px]"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                required
              />
            </div>

            {/* Upload Component Placeholder */}
            <label htmlFor="uploader" className="block text-gray-700 font-medium text-sm mb-2">
              Upload Resume
            </label>
            <div className="border-2 border-solid border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
              {/* You can replace this with your actual Upload component */}
              <UploadInput onFileSelect={setResumeFile} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-200 shadow-md"
            >
              Save & Analyze Resume
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ResumeAnalyzerForm;
