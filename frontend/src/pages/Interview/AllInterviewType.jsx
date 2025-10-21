import React from 'react'
import InterviewInfoCard from '../../components/Cards/InterviewInfoCard'
import { useNavigate } from 'react-router-dom'

function AllInterviewType() {
    const navigate = useNavigate();
  const interviewTypes = [
    {
      id: 1,
      topics: "Question-Answer Types",
      description: "The AI will generate real-world technical questions based on your target role. Answer naturally as you would in a real interview setting. Perfect for practicing problem-solving and communication skills.",
      feedback: "Real-time evaluation of technical knowledge, communication clarity, problem-solving approach, and code quality with actionable improvement suggestions.",
      duration: "5-10",
      mode: "Audio",
      title: "Question-Answer Interview",
          features: ["Live coding evaluation", "Algorithm analysis", "System design feedback", "Communication scoring"],
      onStart: () => navigate('/interview/question-answer')
    },
    {
      id: 2,
      topics: "AI Voice Interview",
      description: "Engage in a dynamic, voice-based interview where the AI responds to your answers with follow-up questions and adapts the conversation flow. Experience realistic interview pressure and improvisation.",
      feedback: "Comprehensive analysis of speech patterns, confidence levels, response structure, technical depth, and conversational flow with personalized coaching tips.",
      duration: "15-20",
      mode: "Video",
      title: "AI Voice Interview",
        features: ["Adaptive questioning", "Voice tone analysis", "Response timing metrics", "Confidence scoring"],
      onStart: () => navigate('/interview/aiinterview')
    }
  ];

  const handleStartInterview = (interviewType) => {
    console.log(`Starting ${interviewType.title}`);
    // Add your interview start logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your{" "}
            <span className="relative">
              Interview Style
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 300 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8 Q150 2 295 8"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the interview format that matches your preparation needs. 
            Each style offers unique benefits for different aspects of interview readiness.
          </p>
        </div>

        {/* Interview Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {interviewTypes.map((interview) => (
            <div key={interview.id} className="flex justify-center">
              <InterviewInfoCard
                topics={interview.topics}
                description={interview.description}
                feedback={interview.feedback}
                duration={interview.duration}
                mode={interview.mode}
                title={interview.title}
                features={interview.features}
                onStart={interview.onStart}
              />
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Which Interview Type is Right for You?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question-Answer Interview</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Perfect for technical screening rounds</li>
                <li>• Focus on problem-solving skills</li>
                <li>• Quick 5-10 minute sessions</li>
                <li>• Great for coding practice</li>
                <li>• Immediate technical feedback</li>
              </ul>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Voice Interview</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Simulates real interview conversations</li>
                <li>• Tests communication under pressure</li>
                <li>• Longer 15-20 minute sessions</li>
                <li>• Adaptive follow-up questions</li>
                <li>• Comprehensive soft skills analysis</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              💡 <strong>Pro Tip:</strong> Start with Question-Answer for technical practice, 
              then move to AI Voice for full interview simulation.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
              Take Assessment Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllInterviewType