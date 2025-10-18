import React, { useState, useEffect } from "react";
import { Check, X, AlertCircle, ArrowRight, TrendingUp, Zap, FileText, Layout, Code } from "lucide-react";
import DownloadButton from '../components/Buttons/DownLoadButton.jsx';
import { useAIStore } from "../stores/useAIStore.js";
import toast from "react-hot-toast";
// This would come from your AI response
const fakefeedbackData = {
  overallScore: 88,
  ATS: {
    score: 42,
    tips: [
      {
        type: "improve",
        tip: "Clear Formatting for ATS"
      },
      {
        type: "improve",
        tip: "Add Relevant Keywords"
      },
      {
        type: "improve",
        tip: "Include Skills Section"
      },
      {
        type: "good",
        tip: "Proper File Format"
      }
    ]
  },
  toneAndStyle: {
    score: 55,
    tips: [
      {
        type: "good",
        tip: "Professional Tone",
        explanation: "Your resume uses clear, confident language that feels polished and job-ready. It makes you sound capable and serious about the role."
      },
      {
        type: "improve",
        tip: "Consistent Tenses",
        explanation: "Use present tense for current roles ('Manage team'), and past tense for previous ones ('Managed team'). This creates better flow and professionalism."
      },
      {
        type: "improve",
        tip: "Avoid First-Person Pronouns",
        explanation: "Instead of 'I led the team', use 'Led a team'. This makes your resume more concise and professional."
      },
      {
        type: "good",
        tip: "Aligned Layout",
        explanation: "Everything is neatly structured—sections are spaced well, and the layout is clean. This makes it easy for recruiters and ATS to scan quickly."
      }
    ]
  },
  content: {
    score: 25,
    tips: [
      {
        type: "good",
        tip: "Tailored to Role",
        explanation: "Your resume aligns well with the job. It speaks directly to the role's needs, which boosts your chances with recruiters and ATS."
      },
      {
        type: "improve",
        tip: "Quantify Impact",
        explanation: "Add data to show results. Instead of 'Managed a team of developers', try 'Led a team of 4 developers to launch 3 client projects, increasing delivery speed by 20%'."
      },
      {
        type: "improve",
        tip: "Use Action Verbs",
        explanation: "Start bullets with strong verbs that show initiative and impact. Replace 'Responsible for...' with action-oriented language."
      },
      {
        type: "good",
        tip: "Avoid Fluff",
        explanation: "You've skipped the clichés and focused on real value. No empty phrases like 'hard-working' or 'team player' — just clear, useful info."
      }
    ]
  },
  structure: {
    score: 70,
    tips: [
      {
        type: "good",
        tip: "Clear Section Organization",
        explanation: "Your resume follows a logical flow with well-defined sections that make it easy for recruiters to find information quickly."
      },
      {
        type: "improve",
        tip: "Reorder Sections",
        explanation: "Consider putting Skills section at the top for tech roles to immediately highlight your technical capabilities to recruiters."
      },
      {
        type: "good",
        tip: "Proper Margins and Spacing",
        explanation: "The layout uses appropriate white space and margins, making the document visually appealing and easy to read."
      },
      {
        type: "improve",
        tip: "Optimize Length",
        explanation: "Consider condensing some sections to ensure your resume stays within the ideal 1-2 page range for maximum impact."
      }
    ]
  },
  skills: {
    score: 32,
    tips: [
      {
        type: "good",
        tip: "Job-Matching Keywords",
        explanation: "Your resume includes relevant terms that match what recruiters and ATS are looking for in a React dev role."
      },
      {
        type: "improve",
        tip: "Replace Generic Skills",
        explanation: "Instead of 'Good at communication', try 'Client communication via Slack, Zoom, and Jira'. Be specific about tools and methodologies."
      },
      {
        type: "improve",
        tip: "Trim Overstuffed Skills",
        explanation: "Too many skills listed can look unfocused or inflated. Prioritize quality over quantity — include only what's relevant to the role."
      },
      {
        type: "improve",
        tip: "Show Skill Application",
        explanation: "Demonstrate how you've used skills in context. Example: 'Built a dashboard using React and Chartjs for real-time data visualization.'"
      }
    ]
  }
};


const ResumeScore = () => {
  const [animatedScores, setAnimatedScores] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackData, setFeedBackData] = useState(null);
  const { aiResumeFeedback, error } = useAIStore();
  
  
  // console.log(aiResumeFeedback);
  // let feedbackData
  // if (error) {
  //   feedbackData = fakefeedbackData;
  //   toast.error(error.message);
  // } else {
  //   feedbackData = aiResumeFeedback;
  //   toast.success("Your resume has successfuly been analysed")
  // }

  useEffect(() => {
    if (error) {
      setFeedBackData(fakefeedbackData);
      console.log(error.message);
    } else {
      setFeedBackData(aiResumeFeedback);
      toast.success("Your Resume has been analysed!!");
    }
  }, [feedbackData, error]);
  console.log(feedbackData);

  useEffect(() => {
    setIsVisible(true);

    // Animate scores
    const timer = setTimeout(() => {
      const scores = {};
      Object.keys(feedbackData).forEach(key => {
        if (key !== 'overallScore' && feedbackData[key]?.score) {
          scores[key] = 0;
        }
      });
      setAnimatedScores(scores);

      // Animate each score
      Object.keys(scores).forEach(key => {
        animateScore(key, feedbackData[key].score);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [feedbackData]);

  const animateScore = (key, targetScore) => {
    let current = 0;
    const increment = targetScore / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        current = targetScore;
        clearInterval(timer);
      }
      setAnimatedScores(prev => ({
        ...prev,
        [key]: Math.floor(current)
      }));
    }, 30);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-400';
    if (score >= 60) return 'from-yellow-500 to-amber-400';
    if (score >= 40) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-pink-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
    if (score >= 60) return 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200';
    if (score >= 40) return 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200';
    return 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200';
  };

  const getStatusIcon = (type) => {
    return type === 'good' ?
      <Check className="w-5 h-5 text-green-600" /> :
      <X className="w-5 h-5 text-red-600" />;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'ATS': return <Zap className="w-6 h-6" />;
      case 'content': return <FileText className="w-6 h-6" />;
      case 'skills': return <Code className="w-6 h-6" />;
      case 'toneAndStyle': return <TrendingUp className="w-6 h-6" />;
      case 'structure': return <Layout className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  const calculateIssuesCount = () => {
    let issues = 0;
    Object.values(feedbackData).forEach(section => {
      if (section.tips) {
        issues += section.tips.filter(tip => tip.type === 'improve').length;
      }
    });
    return issues;
  };

  const issuesCount = calculateIssuesCount();

  if (!feedbackData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200 shadow-sm mb-6">
            <span className="text-sm font-medium text-gray-600">Resume Analysis Complete</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Resume{" "}
            <span className="relative">
              Score
              <svg
                className="absolute -bottom-3 left-0 w-full h-4"
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

          {/* Overall Score Circle */}
          <div className="relative inline-block mb-8">
            <div className="relative">
              {/* Progress Ring Container */}
              <div className="w-48 h-48 rounded-full bg-white shadow-2xl border-8 border-gray-100 flex items-center justify-center">
                {/* Progress Ring Background */}
                <svg className="absolute inset-0 w-48 h-48 transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* Progress circle with animation */}
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - feedbackData.overallScore / 100)}`}
                    className="transition-all duration-2000 ease-out"
                    style={{
                      animation: `progressFill 2s ease-out forwards`
                    }}
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score Text */}
                <div className="text-center relative z-10">
                  <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {feedbackData.overallScore}
                  </span>
                  <span className="text-2xl text-gray-500 block">/100</span>
                </div>
              </div>
            </div>

            {/* Issues badge */}
            <div className="absolute -top-2 -right-2">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm">
                {issuesCount} issues to fix
              </div>
            </div>

            {/* CSS Animation */}
            {/* <style jsx>{`
    @keyframes progressFill {
      from {
        stroke-dashoffset: ${2 * Math.PI * 88};
      }
      to {
        stroke-dashoffset: ${2 * Math.PI * 88 * (1 - feedbackData.overallScore / 100)};
      }
    }
  `}</style> */}
          </div>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your resume analysis is ready. Here's how you can improve your chances with recruiters and ATS systems.
          </p>
        </div>

        {/* Category Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { key: 'ATS', label: 'ATS Score', data: feedbackData.ATS },
            { key: 'content', label: 'Content', data: feedbackData.content },
            { key: 'skills', label: 'Skills', data: feedbackData.skills },
            { key: 'toneAndStyle', label: 'Tone & Style', data: feedbackData.toneAndStyle },
            { key: 'structure', label: 'Structure', data: feedbackData.structure },
          ].map(({ key, label, data }) => (
            <div
              key={key}
              className={`${getScoreBgColor(data.score)} rounded-2xl p-6 border-2 transition-all duration-500 hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                    {getCategoryIcon(key)}
                  </div>
                  <span className="font-semibold text-gray-800">{label}</span>
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(data.score)} bg-clip-text text-transparent`}>
                  {animatedScores[key] || 0}
                </div>
              </div>

              <div className="w-full bg-white/80 rounded-full h-3 mb-2 shadow-inner">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(data.score)} transition-all duration-1000 ease-out`}
                  style={{ width: `${(animatedScores[key] || 0)}%` }}
                ></div>
              </div>

              <div className="text-right">
                <span className="text-sm font-medium text-gray-600">
                  {data.score >= 70 ? 'Strong' : data.score >= 50 ? 'Good' : 'Needs Work'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {[
            { key: 'ATS', title: 'ATS Compatibility', data: feedbackData.ATS },
            { key: 'content', title: 'Content Quality', data: feedbackData.content },
            { key: 'skills', title: 'Skills Presentation', data: feedbackData.skills },
            { key: 'toneAndStyle', title: 'Tone & Style', data: feedbackData.toneAndStyle },
            { key: 'structure', title: 'Structure & Layout', data: feedbackData.structure },
          ].map(({ key, title, data }) => (
            <div key={key} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                    {getCategoryIcon(key)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {data.score}
                      </span>
                      <span className="text-gray-500 text-lg">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.tips.map((tip, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${tip.type === 'good'
                        ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'
                        : 'border-red-200 bg-gradient-to-br from-red-50 to-pink-50'
                      }`}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <div className={`p-1 rounded-full ${tip.type === 'good' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                        {getStatusIcon(tip.type)}
                      </div>
                      <h3 className={`font-semibold text-lg ${tip.type === 'good' ? 'text-green-800' : 'text-red-800'
                        }`}>
                        {tip.tip}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {tip.explanation}
                    </p>

                    {tip.type === 'improve' && (
                      <button className="mt-4 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        <span>Learn how to improve</span>
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Section */}
        <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <DownloadButton feedbackData={feedbackData} />
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ResumeScore;
