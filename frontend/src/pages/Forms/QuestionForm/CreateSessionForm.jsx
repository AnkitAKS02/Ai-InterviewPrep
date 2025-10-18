import React, { useState } from "react";
import { useSessionStore } from "../../../stores/useSessionStore";
import { useNavigate } from "react-router-dom";
import InputCard from "../../../components/Input/InputCard.jsx";
import { X } from "lucide-react";
import { useAIStore } from "../../../stores/useAIStore.js";
const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const { isLoading, createSession } = useSessionStore();
    const { loading, generateInterviewQuestion } = useAIStore();
    // const errors = [sessionError, aiError].filter(Boolean).join(" | ");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // const handleCreateSession = async (e) => {
    //     e.preventDefault();
    //     const aiResponse = await generateInterviewQuestion({ 
    //         role: formData.role, 
    //         experience: formData.experience, 
    //         topicsToFocus: formData.topicsToFocus, 
    //         numberOfQuestion: formData.questions?.length || 4 // default to 10 if not present
    //     });
    //     const generatedQuestions = aiResponse;
    //     console.log(generatedQuestions);
    //     const response = await createSession({
    //         ...formData,
    //         questions: generatedQuestions.data
    //     });
    //     console.log(response);
    //     if (response.data?.session?._id) {
    //         navigate(`/interview-question/${response.data?.session?._id}`)
    //     }
    // };



    // const handleCreateSession = async (e) => {
    //     e.preventDefault();

    //     const { role, experience, topicsToFocus, description } = formData;

    //     if (!role || !experience || !topicsToFocus) {
    //         setEr
    //     }
    //     const aiResponse = await generateInterviewQuestion({
    //         role: formData.role,
    //         experience: formData.experience,
    //         topicsToFocus: formData.topicsToFocus,
    //         numberOfQuestion: 4
    //     });


    //     const response = await createSession({
    //         ...formData,
    //         questions: [{"walla":"what"}]
    //     });

    //     if (response?.data?.session?._id) {
    //         navigate(`/interview-question/${response.data.session._id}`);
    //     }
    // };
    // const handleCreateSession = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // 1️⃣ Generate AI questions
    //         const aiQuestions = await generateInterviewQuestion({
    //             role: formData.role,
    //             experience: formData.experience,
    //             topicsToFocus: formData.topicsToFocus,
    //             numberOfQuestion: 4
    //         });

    //         // 2️⃣ Send everything to backend in one request
    //         const response = await axiosInstance.post("/sessions/create", {
    //             ...formData,
    //             questions: aiQuestions // AI questions included
    //         });

    //         // 3️⃣ Navigate to the created session page
    //         const sessionId = response?.data?.session?._id;
    //         if (sessionId) {
    //             navigate(`/interview-question/${sessionId}`);
    //         }
    //     } catch (error) {
    //         console.log("Error creating session:", error);
    //     }
    // };

    const handleCreateSession = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣ Generate AI questions
            const aiQuestions = await generateInterviewQuestion({
                role: formData.role,
                experience: formData.experience,
                topicsToFocus: formData.topicsToFocus,
                numberOfQuestion: 4
            });

            // 2️⃣ Send session creation request directly to backend
            const response = await createSession({
                ...formData,
                questions: aiQuestions.questions
            });

            // 3️⃣ Navigate after session is created
            if (response.data?.session?._id) {
                navigate(`/inteview-question/${response.data?.session?._id}`);
            }

        } catch (error) {
            console.log("Error creating session:", error);
        }
    };


    return (
        <div className="max-w-full">
            <form
                onSubmit={handleCreateSession}
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto space-y-4"
            >
                {/* Close Button */}
                {/* <button
                    type="button"
                    // closes form (goes back one page) -- not working
                    onClick={navigate(-1)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button> */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Start a New Interview Journey
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    Fill out a few quick details and unlock your personalized set of interview questions!
                </p>

                <InputCard
                    label="Target Role"
                    placeholder="e.g. Frontend Developer, UI/UX Designer, etc."
                    value={formData.role}
                    onChange={(val) => handleChange("role", val)}
                />

                <InputCard
                    label="Years of Experience"
                    placeholder="e.g. 1 year, 3 years, 5+ years"
                    value={formData.experience}
                    onChange={(val) => handleChange("experience", val)}
                />

                <InputCard
                    label="Topics to Focus On"
                    placeholder="Comma-separated, e.g. React, Node.js, MongoDB"
                    value={formData.topicsToFocus}
                    onChange={(val) => handleChange("topicsToFocus", val)}
                />

                <InputCard
                    label="Description"
                    placeholder="Any specific goals or notes for this session"
                    value={formData.description}
                    onChange={(val) => handleChange("description", val)}
                />

                {errors && <p className="text-red-500 text-sm">{errors}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
                    onClick={handleCreateSession}
                >
                    {loading ? "Creating... please wait" : "Create Session"}
                </button>
            </form>
        </div>
    );
};

export default CreateSessionForm;
