import React from "react";
import InputCard from "../../components/Input/InputCard";
import { Plus, Trash2 } from "lucide-react";

const SkillsInfoForm = ({
  skillsInfo = [],
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
      className="bg-white p-6 rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>

      {skillsInfo.map((skill, index) => (
        <div
          key={index}
          className="relative border border-gray-200 rounded-xl p-4 mb-4"
        >
          {/* Remove button */}
          {skillsInfo.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(index)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Skill Name */}
            <InputCard
              label="Skill Name"
              placeholder="e.g. JavaScript"
              value={skill.name}
              onChange={(val) => handleChange(index, "name", val)}
            />

            {/* Proficiency */}
            <div>
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Proficiency ({skill.progress || 0}/5)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleChange(index, "progress", level)}
                    className={`w-6 h-6 rounded-md transition-colors duration-200 ${
                      level <= (skill.progress || 0)
                        ? "bg-purple-600"
                        : "bg-purple-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        type="button"
        onClick={() =>
          addArrayItem({
            name: "",
            progress: 0,
          })
        }
        className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
      >
        <Plus className="mr-2" size={18} /> Add Skill
      </button>

      {/* Next Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
      >
        Next
      </button>
    </form>
  );
};

export default SkillsInfoForm;
