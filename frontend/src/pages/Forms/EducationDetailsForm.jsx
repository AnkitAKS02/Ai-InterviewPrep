import React from "react";
import InputCard from "../../components/Input/InputCard";
import { Plus, Trash2 } from "lucide-react";
const EducationDetailsForm = ({
    educationInfo = [],
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Education
            </h2>

            {educationInfo.map((edu, index) => (
                <div
                    key={index}
                    className="relative p-4 border border-gray-200 rounded-xl space-y-4"
                >
                    {/* Remove button */}
                    {educationInfo.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeArrayItem(index)}
                            className=" cursor-pointer absolute top-3 right-3 text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}

                    <InputCard
                        label="Degree"
                        placeholder="e.g. B.Tech in Computer Science"
                        value={edu.degree}
                        onChange={(val) => handleChange(index, "degree", val)}
                    />

                    <InputCard
                        label="Institution"
                        placeholder="e.g. XYZ University"
                        value={edu.institution}
                        onChange={(val) => handleChange(index, "institution", val)}
                    />

                    <div>
                        <label className="block text-gray-700 font-medium text-sm mb-2">
                            Start Date
                        </label>
                        <input
                            type="month"
                            value={edu.startDate || ""}
                            onChange={(e) => handleChange(index, "startDate", e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium text-sm mb-2">
                            End Date
                        </label>
                        <input
                            type="month"
                            value={edu.endDate || ""}
                            onChange={(e) => handleChange(index, "endDate", e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            ))}


            {/* Add Button */}
            <button
                type="button"
                onClick={() =>
                    addArrayItem({
                        degree: "",
                        institution: "",
                        startDate: "",
                        endDate: "",
                    })
                }
                className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
            >
                <Plus className="mr-2" size={18} /> Add Education
            </button>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
            >
                Next
            </button>
        </form>
    );
};

export default EducationDetailsForm;
