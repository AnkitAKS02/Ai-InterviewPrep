import React from "react";
import { Plus, Trash2 } from "lucide-react";
import InputCard from "../../components/Input/InputCard";

const CertificationInfoForm = ({
  certificationInfo = [],
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
      className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        🏅 Certifications
      </h2>

      {certificationInfo.map((cert, index) => (
        <div
          key={index}
          className="relative border border-gray-200 p-5 rounded-2xl space-y-4 bg-gray-50"
        >
          {/* Remove button */}
          {certificationInfo.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(index)}
              className="cursor-pointer absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCard
            label="Certificate Title"
            placeholder="e.g. Fullstack Web Developer"
            value={cert.title}
            onChange={(val) => handleChange(index, "title", val)}
              />
          <InputCard
            label="Issuer"
            placeholder="e.g. Coursera / Google / etc."
            value={cert.issuer}
            onChange={(val) => handleChange(index, "issuer", val)}
          />
</div>
          <InputCard
            label="Year"
            type="number"
            placeholder="e.g. 2024"
            value={cert.year}
            onChange={(val) => handleChange(index, "year", val)}
          />
        </div>
      ))}

      <div className="space-y-3">
        {/* Add Certification */}
        <button
          type="button"
          onClick={() =>
            addArrayItem({
              title: "",
              issuer: "",
              year: "",
            })
          }
          className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-all"
        >
          <Plus className="mr-2" size={18} /> Add Another Certification
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

export default CertificationInfoForm;
