import React from "react";
import InputCard from "../../components/Input/InputCard";
import { Plus, Trash2 } from "lucide-react";

const WorkExperienceForm = ({
  workExperience = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  onNext,
}) => {
  const handleChange = (index, key, value) => {
    updateArrayItem(index, key, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext && onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Work Experience
      </h2>

      {workExperience.map((experience, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-2xl p-4 space-y-4 relative bg-gray-50"
        >
          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeArrayItem(index)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <InputCard
              label="Company"
              placeholder="ABC Corp"
              value={experience.company || ""}
              onChange={(val) => handleChange(index, "company", val)}
            />

            {/* Role */}
            <InputCard
              label="Role"
              placeholder="Frontend Developer"
              value={experience.role || ""}
              onChange={(val) => handleChange(index, "role", val)}
            />

            {/* Start Date */}
            <div>
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Start Date
              </label>
              <input
                type="month"
                value={experience.startDate || ""}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-gray-700 font-medium text-sm mb-2">
                End Date
              </label>
              <input
                type="month"
                value={experience.endDate || ""}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description (spans 2 columns) */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Description
              </label>
              <textarea
                placeholder="What did you do in this role?"
                value={experience.description || ""}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Work Experience button */}
      <button
        type="button"
        onClick={addArrayItem}
        className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
      >
        <Plus className="mr-2" size={18} /> Add Work Experience
      </button>

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

export default WorkExperienceForm;
