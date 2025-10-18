import React from "react";
import { Plus, Trash2 } from "lucide-react";
import InputCard from "../../components/Input/InputCard";
const ProjectsInfoForm = ({
  projectInfo = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  onNext,
}) => {
  // Ensure at least one project exists

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
      className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        🚀 Project Details
      </h2>

      {projectInfo.map((proj, index) => (
        <div
          key={index}
          className="relative border border-gray-200 p-5 rounded-2xl space-y-4 bg-gray-50"
        >
          {/* Remove button */}
          {projectInfo.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(index)}
              className=" cursor-pointer absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}

          <InputCard
            label="Project Title"
            placeholder="e.g. Portfolio Website"
            value={proj.title}
            onChange={(val) => handleChange(index, "title", val)}
          />

          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Short description about the project"
              value={proj.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <InputCard
            label="GitHub Link"
            placeholder="https://github.com/username/project"
            value={proj.github}
            onChange={(val) => handleChange(index, "github", val)}
          />

          <InputCard
            label="Live Demo URL"
            placeholder="https://yourproject.live"
            value={proj.liveDemo}
            onChange={(val) => handleChange(index, "liveDemo", val)}
          />
        </div>
      ))}

      <div className="space-y-3">
        {/* Add project */}
        <button
          type="button"
          onClick={() =>
            addArrayItem({
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
          className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-all"
        >
          <Plus className="mr-2" size={18} /> Add Another Project
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default ProjectsInfoForm;