import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  // 👉 background variable
  const backgroundUrl = "cursor-background-img.png";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <section
      className="pt-16 pb-24 px-6 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* overlay to improve text visibility */}
      <div className="absolute inset-0 bg-white/50"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            See why{" "}
            <span className="relative">
              200k+ funnels
              <svg
                className="absolute -bottom-2 left-0 w-full h-4"
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
            run on ConvertFlow
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build high-converting funnels for any website, without designers or developers. 
            Launch landing pages, forms, popups, quizzes & more.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors mb-8 inline-flex items-center space-x-2">
            <span>Start For Free</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Case Study Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Nectar Case Study */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-lg mb-4"></div>
              <div className="text-3xl font-bold text-gray-900 mb-2">$500m</div>
              <p className="text-gray-700 mb-4">in sales by experimenting with popup funnels</p>
              <div className="text-sm text-gray-600 mb-4">Nectar Sleep</div>
              <a href="#" className="text-orange-600 font-medium hover:text-orange-700 inline-flex items-center space-x-1">
                <span>Read Case Study</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200 rounded-full opacity-50"></div>
          </div>

          {/* Valyou Case Study */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-lg mb-4"></div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3x</div>
              <p className="text-gray-700 mb-4">more subscribers from targeted offer funnel</p>
              <div className="text-sm text-gray-600 mb-4">Valyou Furniture</div>
              <a href="#" className="text-green-600 font-medium hover:text-green-700 inline-flex items-center space-x-1">
                <span>Read Case Study</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-50"></div>
          </div>

          {/* Haus Labs Case Study */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4"></div>
              <div className="text-3xl font-bold text-gray-900 mb-2">16%</div>
              <p className="text-gray-700 mb-4">purchase rate from targeted quiz funnel for Lady Gaga's brand</p>
              <div className="text-sm text-gray-600 mb-4">Haus Labs</div>
              <a href="#" className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center space-x-1">
                <span>Read Case Study</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Demo Video Placeholder */}
        <div className="text-center">
          <div className="bg-gray-100 rounded-xl max-w-4xl mx-auto aspect-video flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Watch ConvertFlow in Action</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
