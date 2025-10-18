import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InputCard from '../../components/Input/InputCard.jsx';
import { useResumeStore } from '../../stores/useResumeStore.js';

const CreateResumeForm = () => {
    const {  error, createResume } = useResumeStore();
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleCreateResume = async (e) => {
        e.preventDefault();
        if (!title) {
            setError("Please enter resume title");
            return;
        }

        try {
            const newResume = await createResume(title);
            console.log("Resume created:", newResume);
            if(newResume?._id) navigate(`/resume/${newResume._id}`);
        } catch (err) {
            console.log("Error caught in component:", err);
        }
    };

    return (
        <div className='w-[90vw] md:w-[70vh] p-7 flex flex-col justify-center'>
            {/* Changed text size from 'text-lg' to 'text-xl' */}
            <h3 className='text-xl font-semibold text-black'>Create New Resume</h3>

            {/* Changed text size from 'text-xs' to 'text-sm' */}
            <p className='text-sm text-slate-700 mt-[5px] mb-3'>
                Give Your Resume a Title to get Started. You can edit all the details later
            </p>

            <form onSubmit={handleCreateResume} className="flex flex-col gap-4">
                <InputCard
                    value={title}
                    onChange={(val) => setTitle(val)} // fixed onChange
                    label="Resume Title"
                    placeholder="Eg: Ankit's Resume"
                    type="text"
                />

                {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}

                <div className="w-full mt-4">
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    >
                        Create Resume
                    </button>
                </div>

            </form>
        </div>
    )
}

export default CreateResumeForm;
