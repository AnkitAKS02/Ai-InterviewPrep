import React from "react";
import { motion } from "framer-motion";
import { Clock, Mic, Camera, BrainCircuit, Zap, Star, Users } from "lucide-react";

const InterviewInfoCard = ({
  topics,
  description,
  feedback,
  duration,
  mode,
  onStart,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative overflow-hidden">
          {/* Floating elements */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{topics}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-blue-100 text-sm">4.9/5 from 2k+ reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Description Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-900 text-lg">What to Expect</h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-green-50 rounded-lg p-4 border border-green-100">
              {description}
            </p>
          </div>

          {/* Feedback Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-900 text-lg">AI Feedback</h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-purple-50 rounded-lg p-4 border border-purple-100">
              {feedback}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">{duration} min</div>
                <div className="text-gray-600 text-sm">Duration</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {mode === "Video" ? (
                  <Camera className="w-5 h-5 text-green-600" />
                ) : (
                  <Mic className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">{mode} Mode</div>
                <div className="text-gray-600 text-sm">Interview Type</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center justify-center space-x-2 group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-5 h-5 animate-pulse" />
            <span>Start Interview Now</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </motion.button>

          {/* Footer note */}
          <p className="text-center text-gray-500 text-sm">
            Join 10,000+ successful candidates who aced their interviews
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewInfoCard;