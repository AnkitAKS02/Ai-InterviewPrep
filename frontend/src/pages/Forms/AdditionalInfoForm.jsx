import React from "react";
import InputCard from "../../components/Input/InputCard";
import { Plus, Trash2 } from "lucide-react";

const AdditionalInfoForm = ({
  languages = [],
  interests = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  onNext,
}) => {
  const handleLanguageChange = (index, key, value) => {
    updateArrayItem("languages",index, key, value);
  };

  const handleInterestChange = (index, value) => {
    updateArrayItem("interests",index, value);
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
      {/* Languages Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Languages</h2>
        {languages.map((lang, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-xl p-4 mb-4"
          >
            {languages.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("languages",index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <InputCard
                label="Language"
                placeholder="e.g. English"
                value={lang.name}
                onChange={(val) => handleLanguageChange(index, "name", val)}
              />

              <div>
                <label className="block text-gray-700 font-medium text-sm mb-2">
                  Proficiency ({lang.progress || 0}/5)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() =>
                        handleLanguageChange(index, "progress", level)
                      }
                      className={`w-6 h-6 rounded-md transition-colors duration-200 ${
                        level <= (lang.progress || 0)
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

        <button
          type="button"
          onClick={() =>
            addArrayItem("languages",{
              name: "",
              progress: 0,
            })
          }
          className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
        >
          <Plus className="mr-2" size={18} /> Add Language
        </button>
      </div>

      {/* Interests Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Interests</h2>
        {interests.map((interest, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-xl p-4 mb-4"
          >
            {interests.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("interests",index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            )}

            <InputCard
              label="Interest"
              placeholder="e.g. Reading, Traveling, Music"
              value={interest}
              onChange={(val) => handleInterestChange(index, val)}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => addArrayItem("interests","")}
          className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
        >
          <Plus className="mr-2" size={18} /> Add Interest
        </button>
      </div>

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

export default AdditionalInfoForm;
