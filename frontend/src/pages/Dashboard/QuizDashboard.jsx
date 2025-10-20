import React from "react";

const QuizDashboard = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 bg-gradient-to-b from-[#f7fbff] to-white">
      <div
        className="text-center bg-white p-10 rounded-xl shadow-lg max-w-md w-full"
        role="status"
        aria-live="polite"
      >
        <div
          className="text-5xl mb-3 inline-block animate-pulse-smooth"
          aria-hidden="true"
        >
          🐎
        </div>
        <h1 className="m-0 text-2xl font-semibold text-[#0f1724]">
          Coming very soon
        </h1>
        <p className="mt-2 mb-0 text-gray-600">
          Keep your horse in control, please.
        </p>
      </div>

      {/* Custom keyframes for smooth pulse */}
      <style>{`
        @keyframes pulse-smooth {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.06); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-pulse-smooth {
          animation: pulse-smooth 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QuizDashboard;
