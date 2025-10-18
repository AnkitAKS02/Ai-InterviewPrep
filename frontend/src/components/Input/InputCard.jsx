import React from "react";

const InputCard = ({ label, type = "text", placeholder, icon: Icon, value, onChange }) => {
  return (
    <div className="w-full mb-5">
      {label && <label className="block text-gray-700 font-medium text-sm mb-2">{label}</label>}
      <div className="relative w-full">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-base`}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)} // <- call the parent's onChange
          required
        />
      </div>
    </div>
  );
};

export default InputCard;
