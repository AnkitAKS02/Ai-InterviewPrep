import { useState, useEffect } from "react";
import { Check, ArrowRight, Play, Star, Users, FileText, Bot } from "lucide-react";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // 👉 background variable
  const backgroundUrl = "cursor-background-img.png";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  const features = [
    { icon: Bot, text: "AI-Powered Interviews" },
    { icon: FileText, text: "Resume Analysis" },
    { icon: Users, text: "Real-time Feedback" },
    { icon: Star, text: "Personalized Coaching" }
  ];

  return (
    <section
      className="pt-20 pb-28 px-6 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-purple-50/80"></div>
      
      {/* Floating animation elements */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-8 h-8 bg-purple-400 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-green-400 rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm mb-8">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ job seekers</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Master Your Next{" "}
            <span className="relative">
              Interview
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
            </span>{" "}
            with AI
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Practice with AI interviews, get instant feedback on your resume, and solve real-world questions. 
            Everything you need to land your dream tech job.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <span>Start Free Trial</span>
              <ArrowRight size={20} />
            </button>
            <button className="bg-white text-gray-700 hover:bg-gray-50 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 border border-gray-300 shadow-sm hover:shadow-md">
              <Play size={20} className="text-blue-600" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Success Stories Cards */}
        <div className={`grid md:grid-cols-3 gap-6 mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Google Success Story */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:scale-105">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">89%</div>
              <p className="text-gray-700 mb-4">success rate in technical interviews after using our platform</p>
              <div className="text-sm text-gray-600 mb-4">Google Aspirants</div>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300">
                <span>Read Success Story</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
          </div>

          {/* FAANG Success Story */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:scale-105">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2.5x</div>
              <p className="text-gray-700 mb-4">more interview calls with our resume analysis feature</p>
              <div className="text-sm text-gray-600 mb-4">FAANG Candidates</div>
              <a href="#" className="text-green-600 font-medium hover:text-green-700 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300">
                <span>Read Success Story</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-200 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
          </div>

          {/* Startup Success Story */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:scale-105">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">94%</div>
              <p className="text-gray-700 mb-4">of users feel more confident after AI mock interviews</p>
              <div className="text-sm text-gray-600 mb-4">Startup Job Seekers</div>
              <a href="#" className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300">
                <span>Read Success Story</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-200 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
          </div>
        </div>

        {/* Demo Video Placeholder */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl max-w-4xl mx-auto aspect-video flex items-center justify-center mb-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-gray-700 font-medium text-lg">See AI InterviewPrez in Action</p>
              <p className="text-gray-500 text-sm mt-2">Watch how our AI helps you ace interviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}